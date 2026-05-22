import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "lucide-react";
import { Settings } from "lucide-react";

const MetricCard = ({ title, value, change, trend, icon: Icon }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-1`}>
                    {change} {trend === 'up' ? '↑' : '↓'} from last period
                </p>
            </CardContent>
        </Card>
    );
}
export default MetricCard;