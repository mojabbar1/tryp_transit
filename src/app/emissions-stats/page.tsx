'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const EmissionsStatsPage = () => {
  return (
    <>
      <h2 className="text-3xl md:text-5xl font-bold w-full bg-secondary p-6 text-center">
        CO2 Emissions Comparison
      </h2>
      <div className="p-6 text-secondary-foreground text-center">
        <Card className="w-full max-w-4xl mx-auto bg-primary-foreground rounded-lg overflow-hidden shadow-2xl">
          <CardHeader className="bg-primary p-6">
            <CardTitle className="text-secondary text-2xl font-semibold">
              CO2 Emissions Comparison Table
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-primary-foreground">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Public Bus</TableHead>
                  <TableHead>Cars</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-start">
                  <TableCell>CO2 Emissions per Mile</TableCell>
                  <TableCell>2.680 grams</TableCell>
                  <TableCell>404 grams</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Average Number of Passengers</TableCell>
                  <TableCell>30 passengers</TableCell>
                  <TableCell>1.5 passengers</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>CO2 Emissions per Passenger Mile</TableCell>
                  <TableCell>89.33 grams</TableCell>
                  <TableCell>269.33 grams</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Daily Commute (20 miles)</TableCell>
                  <TableCell>1.79 kg (1,786.6 grams)</TableCell>
                  <TableCell>5.39 kg (5,386.6 grams)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Annual CO2 Emissions (250 days)</TableCell>
                  <TableCell>447.15 kg</TableCell>
                  <TableCell>1,347.15 kg</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Daily CO2 Savings</TableCell>
                  <TableCell>3.6 kg</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Annual CO2 Savings</TableCell>
                  <TableCell>900 kg</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>CO2 Savings per Passenger Mile</TableCell>
                  <TableCell>180 grams</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>CO2 Savings Percentage</TableCell>
                  <TableCell>66.82%</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="w-full max-w-4xl mx-auto bg-primary-foreground rounded-lg overflow-hidden shadow-2xl mt-8">
          <CardHeader className="bg-primary p-6">
            <CardTitle className="text-secondary text-2xl font-semibold">
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-primary-foreground text-left">
            <p className="text-lg font-medium text-secondary-foreground mb-4">
              <span className="font-bold">
                CO2 Emissions per Passenger Mile:
              </span>{' '}
              Public buses emit 89.33 grams of CO2 per passenger mile, whereas
              cars emit 269.33 grams per passenger mile.
            </p>
            <p className="text-lg font-medium text-secondary-foreground mb-4">
              <span className="font-bold">CO2 Savings:</span> Switching from
              cars to buses results in a savings of 180 grams of CO2 per
              passenger mile, which is a reduction of approximately 66.82%.
            </p>
            <p className="text-lg font-medium text-secondary-foreground mb-4">
              <span className="font-bold">Daily Commute:</span> For a typical
              20-mile daily commute, a car emits approximately 5.39 kg of CO2,
              while a bus emits approximately 1.79 kg of CO2.
            </p>
            <p className="text-lg font-medium text-secondary-foreground mb-4">
              <span className="font-bold">Annual Impact:</span> Over the course
              of a year (250 commuting days), using a bus instead of a car can
              save approximately 900 kg (0.9 metric tons) of CO2 per commuter.
            </p>
            <p className="text-lg font-medium text-secondary-foreground">
              <span className="font-bold">Conclusion:</span> Using public buses
              instead of cars significantly reduces CO2 emissions, making buses
              a more environmentally friendly choice for daily commutes.
              Encouraging the use of public transportation can contribute to a
              substantial reduction in Charleston&apos;s overall carbon
              footprint.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EmissionsStatsPage;
