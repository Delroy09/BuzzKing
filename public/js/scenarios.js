const scenarios = {
    operational: [
        {
            id: 'op1',
            title: 'Overtime Decision',
            description: 'Development team requests overtime to meet product launch deadline',
            choices: [
                {
                    text: 'Approve overtime',
                    impacts: {
                        companyPerformance: +10,
                        employeeSatisfaction: -5,
                        burnoutMeter: -10
                    }
                },
                {
                    text: 'Deny overtime',
                    impacts: {
                        companyPerformance: -5,
                        employeeSatisfaction: +5,
                        burnoutMeter: +5
                    }
                }
            ]
        }
        // Add more operational scenarios...
    ],
    crisis: [
        {
            id: 'cr1',
            title: 'PR Crisis',
            description: 'A major security flaw has been discovered in your product',
            choices: [
                {
                    text: 'Address immediately',
                    impacts: {
                        companyPerformance: -5,
                        employeeSatisfaction: +5,
                        burnoutMeter: -10
                    }
                },
                {
                    text: 'Investigate first',
                    impacts: {
                        companyPerformance: -10,
                        employeeSatisfaction: -5,
                        burnoutMeter: +5
                    }
                }
            ]
        }
        // Add more crisis scenarios...
    ],
    personal: [
        {
            id: 'pe1',
            title: 'Work-Life Balance',
            description: 'You haven\'t taken a break in weeks',
            choices: [
                {
                    text: 'Take a day off',
                    impacts: {
                        companyPerformance: -5,
                        employeeSatisfaction: 0,
                        burnoutMeter: +15
                    }
                },
                {
                    text: 'Keep working',
                    impacts: {
                        companyPerformance: +5,
                        employeeSatisfaction: -5,
                        burnoutMeter: -10
                    }
                }
            ]
        }
        // Add more personal scenarios...
    ]
};

module.exports = scenarios;