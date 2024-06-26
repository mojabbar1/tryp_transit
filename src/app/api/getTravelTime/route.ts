import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RequestBody } from '@/types/interfaces';
import { convertToUTC } from '@/lib/convertToUTC';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TOMTOM_API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

export async function POST(req: NextRequest) {
  const { currentLocation, destination, timeToDestination }: RequestBody =
    await req.json();

  if (!currentLocation || !destination || !timeToDestination) {
    return NextResponse.json(
      { error: 'Missing required parameters.' },
      { status: 400 },
    );
  }

  const currentLat = currentLocation.latitude;
  const currentLng = currentLocation.longitude;
  const destLat = destination.lat;
  const destLng = destination.lng;

  const bbox = `${Math.min(currentLat!, destLat)},${Math.min(
    currentLng!,
    destLng,
  )},${Math.max(currentLat!, destLat)},${Math.max(currentLng!, destLng)}`;

  try {
    const flowResponseCurrent = await axios.get(
      `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json`,
      {
        params: {
          key: TOMTOM_API_KEY,
          point: `${currentLat},${currentLng}`,
        },
      },
    );

    const flowResponseDestination = await axios.get(
      `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json`,
      {
        params: {
          key: TOMTOM_API_KEY,
          point: `${destLat},${destLng}`,
        },
      },
    );

    const incidentResponse = await axios.get(
      `https://api.tomtom.com/traffic/services/5/incidentDetails`,
      {
        params: {
          key: TOMTOM_API_KEY,
          bbox: bbox,
          fields:
            '{incidents{type,geometry{type,coordinates},properties{iconCategory}}}',
          language: 'en-GB',
          timeValidityFilter: 'present',
        },
      },
    );

    const trafficData: any = {
      flow: {
        current: flowResponseCurrent.data,
        destination: flowResponseDestination.data,
      },
      incidents: incidentResponse.data,
    };

    const utcTime = convertToUTC(timeToDestination);

    const prompt = `You are assisting a user to decide the best time to take a bus from in the Charleston, SC metropolitan area, to avoid traffic congestion and reduce the likelihood of accidents. Historical data shows:

    - High congestion on I-26 and Highway 52 from 7 AM to 9 AM, and 4PM-6PM.
    - Frequent accidents near downtown Charleston on I-26 during morning rush hour.
    - Low bus ridership on suburban routes from Summerville during peak hours.
    
    
    **Instructions**:
    1. **Optimal Travel Time**: Recommend the best time for the user to take the bus today, considering current congestion and accident likelihood.
    2. **Incentive**: Suggest a financial incentive to encourage the user to take the bus, such as a $2 credit for a coffee at a downtown cafe in the morning, or a $2 credit for a alcoholic drink at a downtown bar.
    
    **Output**:
    - Suggested travel time.
    - Incentive details and how the user can redeem it.
    - A push notification message.
    
    Generate a friendly and persuasive response to be sent as a push notification.
    Given the following traffic data: ${JSON.stringify(
      trafficData,
    )}, and current location: ${JSON.stringify(
      currentLocation,
    )}, destination: ${JSON.stringify(
      destination,
    )}, and destination time: ${utcTime}, what is the estimated travel time from the current location to the destination in minutes? Also, estimate the current traffic density based on the flow and incidents data I want the traffic density categorizeed as either Light, Medium, or Heavy. Please return the response as JSON with "travelTime" and "trafficDensity" fields only.`;

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    let result = '';
    for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || '';
    }

    const responseObject = JSON.parse(result);

    return NextResponse.json(responseObject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 },
    );
  }
}
