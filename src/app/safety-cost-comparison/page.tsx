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

const SafetyCostComparisonPage = () => {
  return (
    <>
      <h2 className="text-3xl md:text-5xl font-bold w-full bg-secondary p-6 text-center">
        Safety and Cost Comparison
      </h2>
      <div className="p-6 text-secondary-foreground text-center">
        <Card className="w-full max-w-4xl mx-auto bg-primary-foreground rounded-lg overflow-hidden shadow-2xl mb-8">
          <CardHeader className="bg-primary p-6">
            <CardTitle className="text-secondary text-2xl font-semibold">
              Safety Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-primary-foreground">
            <p className="text-lg font-medium text-secondary-foreground mb-4">
              <span className="font-bold">Fatalities:</span> Buses have
              approximately 90% fewer fatalities compared to cars.
            </p>
            <p className="text-lg font-medium text-secondary-foreground mb-4">
              <span className="font-bold">Injuries:</span> Buses have around
              70-80% fewer injuries compared to cars.
            </p>
            <p className="text-lg font-medium text-secondary-foreground">
              Using public buses is significantly safer compared to cars in
              terms of both fatalities and injuries.
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-4xl mx-auto bg-primary-foreground rounded-lg overflow-hidden shadow-2xl">
          <CardHeader className="bg-primary p-6">
            <CardTitle className="text-secondary text-2xl font-semibold">
              Cost and Environmental Impact Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-primary-foreground">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Criteria</TableHead>
                  <TableHead>Cars</TableHead>
                  <TableHead>Public Buses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-start">
                  <TableCell>Initial Cost</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>0% (no purchase needed)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Depreciation</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>0%</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Fuel Cost</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>10% (included in fare)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Insurance</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>0%</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Maintenance Cost</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>10% (covered by authority)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Repair Cost</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>10% (included in fare)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Parking Cost</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>0%</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Overall Cost</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>20% (fare covers most expenses)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Convenience</TableCell>
                  <TableCell>100% (door-to-door)</TableCell>
                  <TableCell>70% (limited by routes/schedule)</TableCell>
                </TableRow>
                <TableRow className="text-start">
                  <TableCell>Environmental Impact</TableCell>
                  <TableCell>Higher (100%)</TableCell>
                  <TableCell>Lower (30%)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SafetyCostComparisonPage;
