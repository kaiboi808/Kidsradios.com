// FIPS County Codes Database
// KidsRadios.com - Educational Resource
// Note: This is a representative sample. Full FIPS database has 3000+ counties.

const statesData = {
    "AL": {
        name: "Alabama",
        counties: [
            { name: "Jefferson", fips: "01073", city: "Birmingham" },
            { name: "Mobile", fips: "01097", city: "Mobile" },
            { name: "Madison", fips: "01089", city: "Huntsville" },
            { name: "Montgomery", fips: "01101", city: "Montgomery" },
            { name: "Tuscaloosa", fips: "01125", city: "Tuscaloosa" }
        ]
    },
    "AZ": {
        name: "Arizona",
        counties: [
            { name: "Maricopa", fips: "04013", city: "Phoenix" },
            { name: "Pima", fips: "04019", city: "Tucson" },
            { name: "Pinal", fips: "04021", city: "Casa Grande" },
            { name: "Yavapai", fips: "04025", city: "Prescott" },
            { name: "Coconino", fips: "04005", city: "Flagstaff" }
        ]
    },
    "CA": {
        name: "California",
        counties: [
            { name: "Los Angeles", fips: "06037", city: "Los Angeles" },
            { name: "San Diego", fips: "06073", city: "San Diego" },
            { name: "Orange", fips: "06059", city: "Anaheim" },
            { name: "San Francisco", fips: "06075", city: "San Francisco" },
            { name: "Sacramento", fips: "06067", city: "Sacramento" },
            { name: "Santa Clara", fips: "06085", city: "San Jose" },
            { name: "Alameda", fips: "06001", city: "Oakland" },
            { name: "San Bernardino", fips: "06071", city: "San Bernardino" }
        ]
    },
    "CO": {
        name: "Colorado",
        counties: [
            { name: "Denver", fips: "08031", city: "Denver" },
            { name: "El Paso", fips: "08041", city: "Colorado Springs" },
            { name: "Arapahoe", fips: "08005", city: "Aurora" },
            { name: "Jefferson", fips: "08059", city: "Lakewood" },
            { name: "Boulder", fips: "08013", city: "Boulder" },
            { name: "La Plata", fips: "08067", city: "Durango" }
        ]
    },
    "FL": {
        name: "Florida",
        counties: [
            { name: "Miami-Dade", fips: "12086", city: "Miami" },
            { name: "Broward", fips: "12011", city: "Fort Lauderdale" },
            { name: "Palm Beach", fips: "12099", city: "West Palm Beach" },
            { name: "Hillsborough", fips: "12057", city: "Tampa" },
            { name: "Orange", fips: "12095", city: "Orlando" },
            { name: "Duval", fips: "12031", city: "Jacksonville" },
            { name: "Pinellas", fips: "12103", city: "St. Petersburg" }
        ]
    },
    "GA": {
        name: "Georgia",
        counties: [
            { name: "Fulton", fips: "13121", city: "Atlanta" },
            { name: "Gwinnett", fips: "13135", city: "Lawrenceville" },
            { name: "Cobb", fips: "13067", city: "Marietta" },
            { name: "DeKalb", fips: "13089", city: "Decatur" },
            { name: "Chatham", fips: "13051", city: "Savannah" }
        ]
    },
    "IL": {
        name: "Illinois",
        counties: [
            { name: "Cook", fips: "17031", city: "Chicago" },
            { name: "DuPage", fips: "17043", city: "Wheaton" },
            { name: "Lake", fips: "17097", city: "Waukegan" },
            { name: "Will", fips: "17197", city: "Joliet" },
            { name: "Kane", fips: "17089", city: "Aurora" },
            { name: "Sangamon", fips: "17167", city: "Springfield" }
        ]
    },
    "KS": {
        name: "Kansas",
        counties: [
            { name: "Johnson", fips: "20091", city: "Olathe" },
            { name: "Sedgwick", fips: "20173", city: "Wichita" },
            { name: "Shawnee", fips: "20177", city: "Topeka" },
            { name: "Wyandotte", fips: "20209", city: "Kansas City" },
            { name: "Douglas", fips: "20045", city: "Lawrence" }
        ]
    },
    "LA": {
        name: "Louisiana",
        counties: [
            { name: "Orleans Parish", fips: "22071", city: "New Orleans" },
            { name: "East Baton Rouge", fips: "22033", city: "Baton Rouge" },
            { name: "Jefferson Parish", fips: "22051", city: "Metairie" },
            { name: "Caddo Parish", fips: "22017", city: "Shreveport" },
            { name: "Lafayette Parish", fips: "22055", city: "Lafayette" }
        ]
    },
    "MA": {
        name: "Massachusetts",
        counties: [
            { name: "Suffolk", fips: "25025", city: "Boston" },
            { name: "Middlesex", fips: "25017", city: "Cambridge" },
            { name: "Worcester", fips: "25027", city: "Worcester" },
            { name: "Essex", fips: "25009", city: "Salem" },
            { name: "Norfolk", fips: "25021", city: "Quincy" }
        ]
    },
    "MI": {
        name: "Michigan",
        counties: [
            { name: "Wayne", fips: "26163", city: "Detroit" },
            { name: "Oakland", fips: "26125", city: "Pontiac" },
            { name: "Macomb", fips: "26099", city: "Mount Clemens" },
            { name: "Kent", fips: "26081", city: "Grand Rapids" },
            { name: "Washtenaw", fips: "26161", city: "Ann Arbor" }
        ]
    },
    "MO": {
        name: "Missouri",
        counties: [
            { name: "St. Louis City", fips: "29510", city: "St. Louis" },
            { name: "St. Louis County", fips: "29189", city: "Clayton" },
            { name: "Jackson", fips: "29095", city: "Kansas City" },
            { name: "Greene", fips: "29077", city: "Springfield" },
            { name: "Boone", fips: "29019", city: "Columbia" }
        ]
    },
    "NC": {
        name: "North Carolina",
        counties: [
            { name: "Mecklenburg", fips: "37119", city: "Charlotte" },
            { name: "Wake", fips: "37183", city: "Raleigh" },
            { name: "Guilford", fips: "37081", city: "Greensboro" },
            { name: "Forsyth", fips: "37067", city: "Winston-Salem" },
            { name: "Durham", fips: "37063", city: "Durham" },
            { name: "New Hanover", fips: "37129", city: "Wilmington" }
        ]
    },
    "NY": {
        name: "New York",
        counties: [
            { name: "New York (Manhattan)", fips: "36061", city: "New York City" },
            { name: "Kings (Brooklyn)", fips: "36047", city: "Brooklyn" },
            { name: "Queens", fips: "36081", city: "Queens" },
            { name: "Bronx", fips: "36005", city: "Bronx" },
            { name: "Erie", fips: "36029", city: "Buffalo" },
            { name: "Monroe", fips: "36055", city: "Rochester" },
            { name: "Albany", fips: "36001", city: "Albany" }
        ]
    },
    "OH": {
        name: "Ohio",
        counties: [
            { name: "Cuyahoga", fips: "39035", city: "Cleveland" },
            { name: "Franklin", fips: "39049", city: "Columbus" },
            { name: "Hamilton", fips: "39061", city: "Cincinnati" },
            { name: "Summit", fips: "39153", city: "Akron" },
            { name: "Montgomery", fips: "39113", city: "Dayton" },
            { name: "Lucas", fips: "39095", city: "Toledo" }
        ]
    },
    "OK": {
        name: "Oklahoma",
        counties: [
            { name: "Oklahoma", fips: "40109", city: "Oklahoma City" },
            { name: "Tulsa", fips: "40143", city: "Tulsa" },
            { name: "Cleveland", fips: "40027", city: "Norman" },
            { name: "Canadian", fips: "40017", city: "El Reno" },
            { name: "Comanche", fips: "40031", city: "Lawton" }
        ]
    },
    "PA": {
        name: "Pennsylvania",
        counties: [
            { name: "Philadelphia", fips: "42101", city: "Philadelphia" },
            { name: "Allegheny", fips: "42003", city: "Pittsburgh" },
            { name: "Montgomery", fips: "42091", city: "Norristown" },
            { name: "Bucks", fips: "42017", city: "Doylestown" },
            { name: "Delaware", fips: "42045", city: "Media" },
            { name: "Lancaster", fips: "42071", city: "Lancaster" }
        ]
    },
    "TX": {
        name: "Texas",
        counties: [
            { name: "Harris", fips: "48201", city: "Houston" },
            { name: "Dallas", fips: "48113", city: "Dallas" },
            { name: "Tarrant", fips: "48439", city: "Fort Worth" },
            { name: "Bexar", fips: "48029", city: "San Antonio" },
            { name: "Travis", fips: "48453", city: "Austin" },
            { name: "Collin", fips: "48085", city: "Plano" },
            { name: "Hidalgo", fips: "48215", city: "McAllen" },
            { name: "El Paso", fips: "48141", city: "El Paso" }
        ]
    },
    "VA": {
        name: "Virginia",
        counties: [
            { name: "Fairfax", fips: "51059", city: "Fairfax" },
            { name: "Virginia Beach City", fips: "51810", city: "Virginia Beach" },
            { name: "Prince William", fips: "51153", city: "Manassas" },
            { name: "Norfolk City", fips: "51710", city: "Norfolk" },
            { name: "Loudoun", fips: "51107", city: "Leesburg" },
            { name: "Richmond City", fips: "51760", city: "Richmond" }
        ]
    },
    "WA": {
        name: "Washington",
        counties: [
            { name: "King", fips: "53033", city: "Seattle" },
            { name: "Pierce", fips: "53053", city: "Tacoma" },
            { name: "Snohomish", fips: "53061", city: "Everett" },
            { name: "Spokane", fips: "53063", city: "Spokane" },
            { name: "Clark", fips: "53011", city: "Vancouver" }
        ]
    }
};

// Get all states as array for dropdown
function getStates() {
    return Object.keys(statesData).map(code => ({
        code: code,
        name: statesData[code].name
    })).sort((a, b) => a.name.localeCompare(b.name));
}

// Get counties for a state
function getCounties(stateCode) {
    if (statesData[stateCode]) {
        return statesData[stateCode].counties;
    }
    return [];
}

// Search all counties by name or city
function searchCounties(query) {
    const results = [];
    const searchLower = query.toLowerCase();

    Object.keys(statesData).forEach(stateCode => {
        const state = statesData[stateCode];
        state.counties.forEach(county => {
            if (county.name.toLowerCase().includes(searchLower) ||
                county.city.toLowerCase().includes(searchLower)) {
                results.push({
                    ...county,
                    state: state.name,
                    stateCode: stateCode
                });
            }
        });
    });

    return results.slice(0, 10); // Limit to 10 results
}

// Format FIPS code for display
function formatFIPS(fips) {
    return fips.substring(0, 2) + '-' + fips.substring(2);
}

// Get FIPS explanation
function explainFIPS(fips) {
    const stateCode = fips.substring(0, 2);
    const countyCode = fips.substring(2);

    return {
        full: fips,
        stateCode: stateCode,
        countyCode: countyCode,
        explanation: `State code ${stateCode} + County code ${countyCode}`
    };
}
