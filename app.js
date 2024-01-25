// Object to store scanned ULDs categorized by the last two characters
let categorizedUlds = {};

// Function to register ULD
function registerULD() {
    const uldInput = document.getElementById('uldInput').value;
    const emptyStatus = document.getElementById('emptyToggle').checked ? 'Empty' : '';
    const loadedStatus = document.getElementById('loadedToggle').checked ? 'Loaded' : '';

    // Identify ULD type by the first 3 digits
    const uldType = uldInput.slice(0, 3);

    // Identify airline based on the last characters of ULD number
    const airline = identifyAirline(uldInput);

    // Add the scanned ULD to the array
    const uld = {
        uldNumber: uldInput,
        uldType,
        airline,
        status: emptyStatus || loadedStatus,
        mawb: document.getElementById('mawbInput').value,
        location: document.getElementById('locationInput').value,
    };

    // Categorize ULD based on the last two characters
    const lastTwoChars = uldInput.slice(-2);
    if (!categorizedUlds[lastTwoChars]) {
        categorizedUlds[lastTwoChars] = [];
    }
    categorizedUlds[lastTwoChars].push(uld);

    // Display the scanned ULD in the tables
    displayCategorizedUlds();

    // Clear input fields after scanning
    clearInputFields();
}

// Function to identify airline
function identifyAirline(uldNumber) {
    // Example logic to identify airline based on the last characters of ULD number
    const airlineCodes = {
        'AA': 'American Airlines',
        '2C': 'CMA CGM Air Cargo',
        'DL': 'Delta Air Lines (more tracking)',
        'GY': 'Gabon Airlines',
        'AC': 'Air Canada',
        'UA': 'United Airlines Cargo',
        'CP': 'Canadian Airlines Int´l',
        'LH': 'Lufthansa Cargo AG',
        'FX': 'Fedex',
        'AS': 'Alaska Airlines',
        'QC': 'Camair-Co',
        'RG': 'VARIG',
        'KA': 'Dragonair',
        'AR': 'Aerolineas Argentinas',
        'LA': 'LAN Airlines (LATAM)',
        'TP': 'TAP Air Portugal',
        'CY': 'Cyprus Airways',
        'OA': 'Olympic Airways',
        'EI': 'Aer Lingus Cargo',
        'AZ': 'Alitalia (more tracking)',
        'AF': 'Air France (Skyteam tracking)',
        'HM': 'Air Seychelles',
        'OK': 'Czech Airlines (more tracking)',
        'SV': 'Saudi Arabian Airlines (more tracking)',
        'RB': 'Syrian Arab Airlines',
        'ET': 'Ethiopian Airlines',
        'GF': 'Gulf Air',
        'KL': 'KLM Cargo (Skyteam tracking)',
        'IB': 'Iberia',
        'ME': 'Middle East Airlines',
        'MS': 'Egyptair (more tracking)',
        'PR': 'Philippine Airlines',
        'LO': 'LOT Polish Airlines',
        'QF': 'Qantas Airways',
        'SN': 'Brussels Airlines',
        'SA': 'South African Airways',
        'NZ': 'Air New Zealand',
        'I5': 'AirAsia India',
        'IR': 'Iran Air',
        'AI': 'Air India',
        'AY': 'Finnair',
        'BW': 'Caribbean Airlines',
        'FI': 'Icelandair',
        'UP': 'Bahamasair',
        'CK': 'China Cargo Airlines (more tracking)',
        'LY': 'EL AL',
        'JU': 'Air Serbia (JAT)',
        'SK': 'SAS-Scandinavian Airlines System',
        'DT': 'TAAG Angola Airlines',
        'AH': 'Air Algerie',
        'BA': 'British Airways',
        'GA': 'Garuda Indonesia',
        'G3': 'Gol Airlines (VRG Linhas Aéreas)',
        'UO': 'Hongkong Express',
        'MP': 'Martinair Cargo',
        '5F': 'Fly One',
        'JL': 'Japan Airlines',
        'LR': 'LACSA Airlines of Costa Rica',
        'AV': 'Avianca Cargo',
        'CU': 'Cubana de Aviacion',
        'T8': 'MCS Aerocarga de Mexico',
        'AM': 'Aeromexico Cargo (more tracking)',
        'LI': 'LIAT Airlines',
        'FZ': 'flydubai cargo',
        'KF': 'Air Belgium',
        'UC': 'LAN Chile Cargo',
        'AT': 'Royal Air Maroc',
        'QR': 'Qatar Airways',
        'CX': 'Cathay Pacific Airways',
        'CV': 'Cargolux Airlines',
        'HA': 'Hawaiian Airlines',
        '4L': 'LAS Cargo',
        'EK': 'Emirates',
        'KE': 'Korean Air (more tracking)',
        'SW': 'Air Namibia',
        'JX': 'Starlux Cargo',
        'TU': 'Tunisair',
        'TA': 'TACA',
        '5J': 'Cebu Air',
        'NH': 'ANA All Nippon Cargo',
        'PK': 'Pakistan Int´l Airlines',
        'TG': 'Thai Airways',
        'UK': 'TATA SIA Airlines/Vistara Cargo',
        'KU': 'Kuwait Airways',
        'CM': 'Copa Airlines Cargo',
        'MH': 'Malaysian Airline System',
        'MK': 'Air Mauritius (more tracking)',
        '4E': 'Stabo Air',
        'TN': 'Air Tahiti Nui',
        'HY': 'Uzbekistan Airways',
        '0J': 'Jet Club',
        'OS': 'Austrian Cargo (see 020 LH Lufthansa)',
        'MD': 'Air Madagascar',
        'FJ': 'Fiji Airways',
        'U6': 'Ural Airlines Cargo',
        'K4': 'Kalitta Air',
        'RO': 'Tarom',
        'W6': 'Wizz Air *',
        'LD': 'Air Hong Kong',
        'CI': 'China Airlines',
        '5S': 'Global Aviation and Services',
        'OO': 'Sky West Airlines',
        '6E': 'IndiGo CarGo',
        'QP': 'Starlight Airlines',
        'SC': 'Shandong Airlines',
        'DY': 'Norwegian Air Shuttle',
        'S4': 'SATA International',
        'NC': 'Northern Air Cargo / StratAir (more tracking)',
        'YP': 'Air Premia',
        'CO': 'Cobaltair',
        'E7': 'Estafeta Carga Aerea',
        'C8': 'Cargolux Italia',
        'GW': 'Skygreece Airlines',
        '5Y': 'Atlas Air',
        '3K': 'Jetstar Asia Airways',
        'WW': 'WOW Air',
        'KX': 'Cayman Airways',
        'A3': 'Aegean Airlines',
        'PO': 'Polar Air Cargo',
        '5X': 'UPS Air Cargo',
        'N8': 'National Air Cargo',
        'E6': 'Bringer Air Cargo',
        'S7': 'Siberia Airlines',
        'ER': 'DHL Aviation/DHL Airways',
        'ZI': 'Aigle Azur',
        'WB': 'RwandAir',
        'XL': 'LAN Ecuador',
        'ZP': 'Silk Way Airlines',
        'KC': 'Air Astana',
        'SE': 'XL Airways France',
        'ZH': 'Shenzhen Airlines (Chinese)',
        '8V': 'Astral Aviation',
        'W8': 'Cargojet Airways',
        '7L': 'Silk Way West Airlines',
        'N0': 'Norse Atlantic Airways',
        'QJ': 'Jet Airways Inc. (US)',
        'VZ': 'Airclass Lineas Aereas',
        'RJ': 'Royal Jordanian',
        'G9': 'Air Arabia',
        'NO': 'Niger Air Cargo',
        'B7': 'Uni Airways',
        'WN': 'Southwest Airlines',
        'T0': 'Trans American Airways/TACA Peru',
        '3J': 'Jubba Airways',
        'W5': 'Mahan Airlines',
        'TH': 'Raya Airways',
        'JK': 'Aerolinea Del Caribe / Aercaribe',
        'M3': 'ABSA Cargo Airline / LATAM Cargo Brasil',
        'SU': 'Aeroflot (alternate tracking site)',
        'P3': 'Cargologicair',
        'PS': 'Ukraine Int´l Airlines',
        '9U': 'Air Moldova',
        '4W': 'Allied Air',
        '7C': 'Coyne Airways',
        'KY': 'Skylease Cargo',
        'AD': 'Azul Cargo Azul Cargo domestic',
        'RU': 'AirBridge Cargo',
        '2Y': 'My Indo Airlines',
        '9W': 'Jet Airways',
        'DD': 'Nok Air',
        'UL': 'SriLankan Cargo',
        'EY': 'ETIHAD Airways',
        'TB': 'TUI Airlines',
        'QY': 'DHL Aviation / European Air Transport',
        'SQ': 'Singapore Airlines',
        'MO': 'Calm Air',
        'FB': 'Bulgaria Air',
        'PC': 'Pegasus Cargo',
        'B2': 'Belavia Belarusian Airlines',
        'MI': 'Silk Air',
        'DK': 'Sunclass Airlines',
        'GL': 'Air Greenland',
        'IY': 'Yemenia Yemen Airways',
        'BP': 'Air Botswana',
        'KM': 'Air Malta',
        '4S': 'Solar Cargo',
        'TS': 'Air Transat (more tracking)',
        'PX': 'Air Niugini',
        'BT': 'Air Baltic',
        'X8': 'Airmax Cargo',
        'BI': 'Royal Brunei Airlines',
        'NX': 'Air Macau',
        'KH': 'Aloha Air Cargo',
        'BR': 'Eva Airways',
        'UW': 'Uni-Top Airlines',
        '5C': 'Challenge Airlines IL',
        'NO': 'Neos SPA',
        'KQ': 'Kenya Airways',
        'MR': 'ACTC',
        'MB': 'MNG Airlines',
        'LX': 'Swiss',
        'QT': 'Tampa Airlines',
        'MF': 'XiamenAir',
        'SP': 'SATA Air Acores',
        'VN': 'Vietnam Airlines',
        'X7': 'Challenge Airlines BE',
        'X6': 'Challenge Airlines MT',
        'TB': 'Jetairfly',
        '3V': 'ASL Airlines Belgium (formerly TNT Airways)',
        'DI': 'Norwegian Air UK',
        'J2': 'Azerbaijan Airlines',
        'FM': 'Shanghai Airlines',
        'SG': 'SpiceJet',
        'MU': 'China Eastern Airlines',
        'E9': 'Iberojet / Evelop Airlines',
        'CZ': 'China Southern Airlines (more tracking)',
        'AE': 'Mandarin Airlines',
        '4X': 'Mercury Americas',
        '7C': 'Jeju Air',
        'AK': 'AirAsia Berhad',
        'M6': 'Amerijet International',
        'OD': 'Malindo Airways',
        'S6': 'SAC South American Airways',
        'GS': 'TianJin Airlines',
        'R4': 'RUS (Reliable Unique Services) Aviation',
        'RH': 'Hong Kong Air Cargo',
        'PG': 'Bangkok Airways',
        'OU': 'Croatia Airlines',
        'GB': 'ABX Air',
        'WS': 'Westjet Cargo',
        'D7': 'AirAsia',
        'HX': 'Hong Kong Airlines',
        'M7': 'MASAir',
        'Y8': 'Suparana / Jinpeng / Yangtze River Express Airlines',
        '6R': 'AeroUnion',
        '3U': 'Sichuan Airlines',
        'HU': 'Hainan Airlines',
        'DE': 'Condor Flugdienst',
        'B1': 'TAB Transportes Aereos Bolivianos',
        'WY': 'Oman Air',
        'O3': 'SF Airlines',
        'SS': 'Corsair',
        'VS': 'Virgin Atlantic',
        'KZ': 'Nippon Cargo Airlines',
        'D0': 'DHL Aviation',
        'V4': 'Vensecar Internacional',
        'JJ': 'LATAM Airlines Brasil',
        '7I': 'Insel Air Cargo',
        'OV': 'Estonian Air',
        'CQ': 'Charterlines',
        'VJ': 'Vietjet',
        'L7': 'LATAM CARGO Colombia',
        'OZ': 'Asiana Airlines',
        'D5': 'DHL Aero Expreso',
        'KJ': 'Air Incheon',
        'UX': 'Air Europa Cargo',
        'BG': 'Biman Bangladesh',
        'CA': 'Air China'
        // Add more airline codes as needed
    };

    const lastTwoChars = uldNumber.slice(-2);
    return airlineCodes[lastTwoChars] || 'Unknown';
}

// Function to display categorized ULDs
function displayCategorizedUlds() {
    const tablesContainer = document.getElementById('tablesContainer');
    tablesContainer.innerHTML = ''; // Clear existing tables

    for (const category in categorizedUlds) {
        const categoryUlds = categorizedUlds[category];

        // Create a table for each category
        const table = document.createElement('table');
        table.innerHTML = `<thead><tr><th>ULD Number</th><th>ULD Type</th><th>Airline</th><th>Status</th><th>MAWB</th><th>Location</th></tr></thead><tbody id="${category}Body"></tbody>`;
        tablesContainer.appendChild(table);

        const categoryBody = document.getElementById(`${category}Body`);

        // Populate the table with scanned ULDs in the current category
        categoryUlds.forEach((uld) => {
            const row = categoryBody.insertRow();
            row.insertCell(0).textContent = uld.uldNumber;
            row.insertCell(1).textContent = uld.uldType;
            row.insertCell(2).textContent = uld.airline;
            row.insertCell(3).textContent = uld.status;
            row.insertCell(4).textContent = uld.mawb || ''; // Display empty string if MAWB is not available
            row.insertCell(5).textContent = uld.location || ''; // Display empty string if location is not available
        });
    }
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById('uldInput').value = '';
    document.getElementById('emptyToggle').checked = false;
    document.getElementById('loadedToggle').checked = false;
    document.getElementById('mawbInput').value = '';
    document.getElementById('locationInput').value = '';
}
