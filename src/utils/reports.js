export const allCountries = [
    {
        name: "United Kingdom",
        code: "UK",
    },
    {
        name: "Germany",
        code: "DE",
    },
    {
        name: "China",
        code: "CN"
    },
    {
        name: "South Korea",
        code: "KR"
    },
    {
        name: "Japan",
        code: "JP"
    },
    {
        name: "United States",
        code: "US"
    },
    {
        name: "India",
        code: "IN"
    }
];

const indexes = [0, 42, 45, 41, 43, 32, 51, 28, 24, 53, 49, 31, 30, 36, 47, 30, 28, 54, 46];

export const categories = [
    {
        name: "Trade Indexes",
        subs: ["Country Trade", "Air Trade", "Ocean Trade"]
    },
    {
        name: "Sector Developments",
        subs: [
            "Basic Raw Materials",
            "Capital Equip. & Machinery",
            "Chemicals & Products",
            "Consumer Fashion Goods",
            "High Technology",
            "Industrial Raw Materials",
            "Land Vehicles & Parts",
            "Machinery Parts",
            "Personal & Household Goods",
            "Temp. or Climate Control"
        ]
    }
];

export function generateIndexes(countries) {
    let firstIndex = indexes[Math.floor(Math.random() * indexes.length)];
  
    let secondIndex;
    
    do {
        secondIndex = indexes[Math.floor(Math.random() * indexes.length)];
    } while (firstIndex === 0 && secondIndex === 0);

    return {
        [countries[0]]: firstIndex,
        [countries[1]]: secondIndex
    };
}

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getData(countries, range) {
    const start = range.split(' ')[0].split('-')[0];
    const end = range.split(' ')[0].split('-')[1];
    const year = range.split(' ')[1];

    const allReports = [];

    for (let i = +start; i <= +end; i++) {
        const month = months[i-1];
        const indexReports = [];
        for (let category of categories) {
            const subIndexes = [];
            for (let sub of category.subs) {
                subIndexes.push({
                    name: sub,
                    indexes: generateIndexes(countries)
                })
            }

            indexReports.push({
                category: category.name,
                subs: subIndexes,
            });
        }

        allReports.push({
            month,
            data: indexReports
        });
    }
    
    
    return {
        year,
        countries: allCountries.filter(country => countries.includes(country.code)),
        reports: allReports
    };
}