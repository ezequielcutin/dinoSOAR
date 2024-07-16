import React, { useState } from 'react';
import "../style/Home.css";

/* The master list that holds all the flight search results. */
let master = [];

/* The list that conatins the flights that fit within
the filter limits and are visible to the user. */
let visible = [];

const countries = {
    'Austria' : ['Klagenfurt','Salzburg','Vienna'],
    'Belgium' : ['Brussels'],
    'Bosnia & Herzegovina' : ['Banja Luka','Tuzla'],
    'Bulgaria' : ['Burgas','Plovdiv','Sofia','Varna'],
    'Croatia' : ['Dubrovnik','Osijek','Pula','Rijeka','Split','Zadar','Zagreb'],
    'Cyprus' : ['Larnaca','Paphos'],
    'Czech Republic' : ['Brno','Ostrava','Pardubice','Prague'],
    'Denmark' : ['Aalborg','Aarhus','Billund','Copenhagen'],
    'Estonia' : ['Tallinn'],
    'Finland' : ['Helsinki','Lapland Rovaniemi','Lappeenranta','Tampere'],
    'France' : ['Bergerac','Beziers','Biarritz','Bordeaux','Brive','Carcassonne','Clermont','Dole','Figari','Grenoble','La Rochelle','Lille','Limoges','Lourdes','Marseille','Nantes','Nice','Nimes','Paris','Perpignan','Poitiers','Rodez','Strasbourg','Toulouse','Tours Loire Valley'],
    'Germany' : ['Berlin','Bremen','Cologne','Dortmund','Dresden','Frankfurt','Hamburg','Karlsruhe / Baden-Baden','Leipzig','Memmingen','Münster','Nuremberg','Paderborn'],
    'Greece' : ['Athens','Chania','Corfu','Crete','Kalamata','Kefalonia','Kos','Mykonos','Preveza - Aktion','Rhodes','Santorini','Skiathos','Thessaloniki','Zakynthos'],
    'Hungary' : ['Budapest'],
    'Ireland' : ['Cork','Dublin','Kerry','Knock & Ireland West','Shannon'],
    'Israel' : ['Eilat Ramon','Tel Aviv'],
    'Italy' : ['Alghero','Ancona','Bari','Bergamo','Bologna','Brindisi','Cagliari','Catania','Crotone','Cuneo','Genoa','Lamezia','Milan','Naples','Palermo','Parma','Perugia','Pescara','Pisa','Rimini','Rome','Trapani-Marsala','Trieste','Turin','Venice','Verona'],
    'Jordan' : ['Amman','Aqaba'],
    'Latvia' : ['Riga'],
    'Lithuania' : ['Kaunas','Palanga','Vilnius'],
    'Luxembourg' : ['Luxembourg'],
    'Malta' : ['Malta'],
    'Montenegro' : ['Podgorica'],
    'Morocco' : ['Agadir','Essaouira','Fez','Marrakesh','Nador','Ouarzazate','Oujda','Rabat','Tangier','Tétouan'],
    'Netherlands' : ['Amsterdam','Eindhoven','Maastricht'],
    'Norway' : ['Oslo'],
    'Poland' : ['Bydgoszcz','Gdańsk','Katowice','Kraków','Łódź','Warsaw','Wrocław'],
    'Portugal' : ['Faro','Lisbon','Madeira Funchal','Ponta Delgada','Porto','Terceira Lajes'],
    'Romania' : ['Bucharest','Cluj','Iasi'],
    'Serbia' : ['Nis'],
    'Slovakia' : ['Bratislava','Košice'],
    'Spain' : ['Alicante','Almeria','Asturias','Barcelona','Fuerteventura','Gran Canaria','Ibiza','Jerez','Lanzarote','Madrid','Malaga','Mallorca','Menorca','Murcia','Santander','Santiago','Seville','Tenerife','Valencia','Valladolid','Vigo','Vitoria','Zaragoza'],
    'Sweden' : ['Göteborg Landvetter','Lulea','Malmo','Orebro','Skelleftea','Stockholm','Växjö Småland','Visby Gotland'],
    'Switzerland' : ['Basel'],
    'Turkey' : ['Bodrum','Dalaman'],
    'United Kingdom' : ['Aberdeen','Belfast','Birmingham','Bournemouth','Bristol','Cardiff','Derry','East Midlands','Edinburgh','Glasgow','Leeds','Liverpool','London','Manchester','Newcastle','Newquay Cornwall','Teesside']
};

const airports = {
    'Klagenfurt' : ['KLU'], 'Salzburg' : ['SZG'], 'Vienna' : ['VIE'],
    'Brussels' : ['BRU', 'CRL'],
    'Banja Luka' : ['BNX'], 'Tuzla' : ['TZL'],
    'Burgas' : ['BOJ'], 'Plovdiv' : ['PDV'], 'Sofia' : ['SOF'], 'Varna' : ['VAR'],
    'Dubrovnik' : ['DBV'], 'Osijek' : ['OSI'], 'Pula' : ['PUY'], 'Rijeka' : ['RJK'], 'Split' : ['SPU'], 'Zadar' : ['ZAD'],  'Zagreb' : ['ZAG'],
    'Larnaca' : ['LCA'], 'Paphos' : ['PFO'],
    'Brno' : ['BRQ'], 'Ostrava' : ['OSR'], 'Pardubice' : ['PED'],'Prague' : ['PRG'],
    'Aalborg' : ['AAL'], 'Aarhus' : ['AAR'], 'Billund' : ['BLL'], 'Copenhagen' : ['CPH'],
    'Tallinn' : ['TLL'],
    'Helsinki': ['HEL'], 'Lapland Rovaniemi': ['RVN'], 'Lappeenranta': ['LPP'], 'Tampere': ['TMP'],
    'Bergerac' : ['EGC'], 'Beziers' : ['BZR'], 'Biarritz' : ['BIQ'], 'Bordeaux' : ['BOD'], 'Brive' : ['BVE'], 'Carcassonne' : ['CCF'], 'Clermont' : ['CFE'], 'Dole' : ['DLE'], 'Figari' : ['FSC'], 'Grenoble' : ['GNB'], 'La Rochelle' : ['LRH'], 'Lille' : ['LIL'], 'Limoges' : ['LIG'], 'Lourdes' : ['LDE'], 'Marseille' : ['MRS'], 'Nantes' : ['NTE'], 'Nice' : ['NCE'], 'Nimes' : ['FNI'], 'Paris' : ['BVA','XCR'], 'Perpignan' : ['PGF'], 'Poitiers' : ['PIS'], 'Rodez' : ['RDZ'], 'Strasbourg' : ['SXB'], 'Toulouse' : ['TLS'], 'Tours Loire Valley' : ['TUF'],
    'Berlin' : ['BER'], 'Bremen' : ['BRE'], 'Cologne' : ['CGN'], 'Dortmund' : ['DTM'], 'Dresden' : ['DRS'], 'Dusseldorf' : ['NRN'], 'Frankfurt' : ['HHN'], 'Hamburg' : ['HAM'], 'Karlsruhe / Baden-Baden' : ['FKB'], 'Leipzig' : ['LEJ'], 'Memmingen' : ['FMM'], 'Münster' : ['FMO'], 'Nuremberg' : ['NUE'], 'Paderborn' : ['PAD'],
    'Athens' : ['ATH'], 'Chania' : ['CHQ'], 'Corfu' : ['CFU'], 'Crete' : ['HER'], 'Kalamata' : ['KLX'], 'Kefalonia' : ['EFL'], 'Kos' : ['KGS'], 'Mykonos' : ['JMK'], 'Preveza - Aktion' : ['PVK'], 'Rhodes' : ['RHO'], 'Santorini' : ['JTR'], 'Skiathos' : ['JSI'], 'Thessaloniki' : ['SKG'], 'Zakynthos' : ['ZTH'],
    'Budapest' : ['BUD'],
    'Cork' : ['ORK'], 'Dublin' : ['DUB'], 'Kerry' : ['KIR'], 'Knock' : ['NOC'], 'Shannon' : ['SNN'],
    'Eilat Ramon' : ['ETM'], 'Tel Aviv' : ['TLV'],
    'Alghero' : ['AHO'], 'Ancona' : ['AOI'], 'Bari' : ['BRI'], 'Bergamo' : ['BGY'], 'Bologna' : ['BLQ','FRL'], 'Brindisi' : ['BDS'], 'Cagliari' : ['CAG'], 'Catania' : ['CTA'], 'Crotone' : ['CRV'], 'Cuneo' : ['CUF'], 'Genoa' : ['GOA'], 'Lamezia' : ['SUF'], 'Milan' : ['BGY','MXP'], 'Naples' : ['NAP'], 'Palermo' : ['PMO'],  'Parma' : ['PMF'], 'Perugia' : ['PEG'], 'Pescara' : ['PSR'], 'Pisa' : ['PSA'], 'Rimini' : ['RMI'], 'Rome' : ['CIA','FCO'], 'Trapani-Marsala' : ['TPS'], 'Trieste' : ['TRS'], 'Turin' : ['TRN'], 'Venice' : ['VCE','TSF'], 'Verona' : ['VRN'],
    'Amman' : ['AMM'], 'Aqaba' : ['AQJ'],
    'Riga' : ['RIX'],
    'Kaunas' : ['KUN'], 'Palanga' : ['PLQ'], 'Vilnius' : ['VNO'],
    'Luxembourg' : ['LUX'],
    'Malta' : ['MLA'],
    'Podgorica' : ['TGD'],
    'Agadir' : ['AGA'], 'Essaouira' : ['ESU'], 'Fez' : ['FEZ'], 'Marrakesh' : ['RAK'], 'Nador' : ['NDR'], 'Ouarzazate' : ['OZZ'], 'Oujda' : ['OUD'], 'Rabat' : ['RBA'], 'Tangier' : ['TNG'], 'Tétouan' : ['TTU'],
    'Amsterdam' : ['AMS'], 'Eindhoven' : ['EIN'], 'Maastricht' : ['MST'],
    'Oslo' : ['OSL','TRF'],
    'Bydgoszcz' : ['BZG'], 'Gdańsk' : ['GDN'], 'Katowice' : ['KTW'], 'Kraków' : ['KRK'], 'Łódź' : ['LCJ'], 'Lublin' : ['LUZ'], 'Olsztyn - Mazury' : ['SZY'], 'Poznan' : ['POZ'], 'Rzeszow' : ['RZE'], 'Szczecin' : ['SZZ'], 'Warsaw' : ['WAW','WMI'], 'Wrocław' : ['WRO'],
    'Faro' : ['FAO'], 'Lisbon' : ['LIS'], 'Madeira Funchal' : ['FNC'], 'Ponta Delgada' : ['PDL'], 'Porto' : ['OPO'], 'Terceira Lajes' : ['TER'],
    'Bucharest' : ['OTP'], 'Cluj' : ['CLJ'], 'Iasi' : ['IAS'],
    'Nis' : ['INI'],
    'Bratislava' : ['BTS'], 'Košice' : ['KSC'],
    'Alicante' : ['ALC'], 'Almeria' : ['LEI'], 'Asturias' : ['OVD'], 'Barcelona' : ['BCN','GRO','REU'], 'Fuerteventura' : ['FUE'], 'Gran Canaria' : ['LPA'], 'Ibiza' : ['IBZ'], 'Jerez' : ['XRY'], 'Lanzarote' : ['ACE'], 'Madrid' : ['MAD'], 'Malaga' : ['AGP'], 'Mallorca' : ['PMI'], 'Menorca' : ['MAH'], 'Murcia' : ['RMU'], 'Santander' : ['SDR'], 'Santiago' : ['SCL'], 'Seville' : ['SVQ'], 'Tenerife' : ['TFN','TFS'], 'Valencia' : ['VLC','CDT'], 'Valladolid' : ['VLL'], 'Vigo' : ['VGO'], 'Vitoria' : ['VIT'], 'Zaragoza' : ['ZAZ'],
    'Göteborg Landvetter' : ['GOT'], 'Lulea' : ['LLA'], 'Malmo' : ['MMX'], 'Orebro' : ['ORB'], 'Skelleftea' : ['SFT'], 'Stockholm' : ['ARN','VST'], 'Växjö Småland' : ['VXO'], 'Visby Gotland' : ['VBY'],
    'Basel' : ['EAP'],
    'Bodrum' : ['BJV'], 'Dalaman' : ['DLM'],
    'Aberdeen' : ['ABZ'], 'Belfast' : ['BFS'], 'Birmingham' : ['BHX'], 'Bournemouth' : ['BOH'], 'Bristol' : ['BRS'],  'Cardiff' : ['CWL'], 'Derry' : ['LDY'], 'East Midlands' : ['EMA'], 'Edinburgh' : ['EDI'], 'Glasgow' : ['GLA','PIK'], 'Leeds' : ['LBA'], 'Liverpool' : ['LPL'], 'London' : ['LGW','LTN','STN'], 'Manchester' : ['MAN'], 'Newcastle' : ['NCL'], 'Newquay Cornwall' : ['NQY'], 'Teesside' : ['MME']
};

/* The object that contains the search
parameters that will be sent to the backend. */
let searchParams = {
    allFrom: [],
    allTo: [],
    from: '',
    to: '',
    departDate: '',
    numLayovers: 0,
};

/* The main function that is run every time the website opens. */
function Home() {
    
    /* Declaration of variables and the functions
    for setting them using the useState function. */
    const [departureLocation, setDepartureLocation] = useState('select airport...');
    const [destination, setDestination] = useState('select airport...');
    const [departDate, setDepartDate] = useState('null');
    const [time, setTime] = useState(288);
    const [cost, setCost] = useState(100);
    const [sortType, setSortType] = useState('cost');
    const [searched, setSearched] = useState(false);
    const [searching, setSearching] = useState(false);

    function setDepartureDate(input){
        setDepartDate(input);
        searchParams.departDate = departDate;
    }

    /* The function that is called after the
    search results are retrieved from the API. */
    function searchHelper(response){
        /* For every flight, convert the information
        into a list format and add it to the master. */
        for (let i = 0; i < response.length; i++){
            let input = [];
            input.push(response[i].number);
            if (response[i].number[0] === 'R'){
                input.push('RyanAir');
            }
            else{
                input.push('Lufthansa');
            }
            input.push(response[i].origin);
            input.push(response[i].dept_time);
            input.push(response[i].dest);
            input.push(response[i].arr_time);
            input.push(response[i].duration);
            input.push(response[i].price);
            master.push(input);
        } // for

    } // searchHelper

    /* Function for sending search parameters
    to the backend to get search results. */
    function sendSearchResults() {

        console.log(searchParams.allFrom);
        console.log(searchParams.allTo);
        console.log(searchParams.from);
        console.log(searchParams.to);
        console.log(searchParams.departDate);

        /* Indicate the user has requested a search. */
        setSearched(true);

        /* Indicate searching is in progress. */
        setSearching(true);

        /* Prevent the default form submission behavior */
        //event.preventDefault();

        /* Empty the master of previous search results. */
        master = [];
        for (let i = 0; i < searchParams.allFrom.length; i++){
            searchParams.from = searchParams.allFrom[i];
            for (let j = 0; j < searchParams.allTo.length; j++){
                searchParams.to = searchParams.allTo[j];
                /* Post the search parameters to the backend
                 and fetch the results of the search. */
                fetch('http://127.0.0.1:5000/search_inputs', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(searchParams)
                })

                /* Convert the reponse into JSON. */
                .then(response => response.json())

                /* Send the JSON response to the searchHelper
                for initialization and storage. */
                .then(response => searchHelper(response))

                .then(() => ((i === (searchParams.allFrom.length - 1)) && (j === (searchParams.allTo.length - 1))) ? setSearching(false):setSearching(true))

                /* Catch any errors that result from the fetch. */
                .catch(err => console.log({err}.err));
            }
        }
    } // sendSearchResults

    /* React element for displaying each search result. */
    function Results() {

        /* For each visible flight, displaying the details of the flight. */
        return visible.map(result => 
                <tr>
                    <td>{result[0]}</td>
                    <td>{result[1]}</td>
                    <td>{result[2]}</td>
                    <td>{result[3]}</td>
                    <td>{result[4]}</td>
                    <td>{result[5]}</td>
                    <td>{parseInt(result[6]/60)} hr {result[6] % 60} min</td>
                    <td>€{result[7]}</td>
                </tr>
            );

    } // Results

    function convertFromAirport(input){
        setDepartureLocation(input);
        searchParams.allFrom = airports[input];
    }

    function convertToAirport(input){
        setDestination(input);
        searchParams.allTo = airports[input];
    }

    function FromAirport({countryKey}){
        return countries[countryKey].map(result => <button onClick ={() => convertFromAirport(result)}>{result}</button>);
    }

    function ToAirport({countryKey}){
        return countries[countryKey].map(result => <button onClick ={() => convertToAirport(result)}>{result}</button>);
    }
    
    function FromCountry(){
        return Object.entries(countries).map( ([key, value]) => (
                <div class="sub_dropdown">
                    <button>{key}</button>
                    <div class="sub_dropdown-content">
                        <FromAirport countryKey={key}/>
                    </div>
                </div>
            ));
    }

    function ToCountry(){
        return Object.entries(countries).map( ([key, value]) => (
                <div class="sub_dropdown">
                    <button>{key}</button>
                    <div class="sub_dropdown-content">
                        <ToAirport countryKey={key}/>
                    </div>
                </div>
            ));
    }

    /* React element for displaying the results page. */
    function ResultPage() {

        /* While the fetch request is running, show a loading page. */
        if (searching){
            return (
                <div class="container">
                    Please wait, we are loading the results of your search...
                    <div class="loading">
                        <button/>
                    </div>
                </div>
            );
        }

        /* After the fetch request is complete. */
        else {

            /* If there are no flights available, show an error page. */
            if (master.length === 0){
                return (
                    <div class="container">
                        <h2>Sorry! There are no available flights from {departureLocation} to {destination} on {departDate}, or there was an error retrieving data. Please return to the search page and try another flight search.</h2>
                        <div class = "failed">
                            <button/>
                        </div>
                    </div>
                );
            }

            /* Otherwise, show the results page as normal. */
            else {
                return (
                    <div>
                        <div class="container">
                            <h1>Filters:</h1>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div className="Slider">
                                        <h2>Cost Limits</h2>
                                        <p>Move the slider to choose how much you are willing to pay foryour trip.</p>
                                        <input id="costRange"
                                            max={100}
                                            type="range"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.valueAsNumber)}
                                        />
                                        <p>Maximum cost: €{cost*10}</p>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div className="Slider">
                                        <h2>Time Limits</h2>
                                        <p>Move the slider to choose how long you are willing your trip to take.</p>
                                        <input id="timeRange"
                                            max={288}
                                            type="range"
                                            value={time}
                                            onChange={(e) => setTime(e.target.valueAsNumber)}
                                        />
                                        <p>Maximum time: {parseInt(time*5/60)} hr {time*5 % 60} min</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <h2>Sort results by...</h2>
                            <div class="col-sm-1">
                                <button onClick={() => setSortType('cost')}>
                                    Cost
                                </button>
                            </div>
                            <div class="col-sm-1">
                                <button onClick={() => setSortType('time')}>
                                    Time
                                </button>
                            </div>
                            <div class="col-sm-1">
                                <button onClick={() => setSortType('airline')}>
                                    Airline
                                </button>
                            </div>
                        </div>
                        <div class="container">
                            <h1>Flight Results: currently showing {visible.length} flight option(s) sorted by {sortType}.</h1>  
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Flight number</th>
                                        <th>Airline</th>
                                        <th>Departure Airport</th>
                                        <th>Departure Time</th>
                                        <th>Arrival Airport</th>
                                        <th>Arrival Time</th>
                                        <th>Total Time</th>
                                        <th>Estimated Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Results/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        }

    } // ResultsPage

    /* Function for updating the visible results each
    time the sorting or filters are changed. */
    function update(){

        /* Clear the visible list. */
        visible = [];

        /* For each flight result that is within the limit
        of the filters, add it to the visible list. */
        for (let i = 0; i < master.length; i++){
            if (master[i][6] <= time*5 && master[i][7] <= cost*10){
                visible.push(master[i]);
            }
        }

        /* If the sorting type is by cost, sort by increasing cost. */
        if (sortType === 'cost'){
            visible.sort(function compareFn(a, b) { 
                if (a[7] < b[7]){
                    return -1
                }
                else if (a[7] > b[7]){
                    return 1
                }
                else {
                    return 0
                }
            }); // visible.sort
        } // if

        /* If the sorting type is by time, sort by increasing time. */
        else if (sortType === 'time'){
            visible.sort(function compareFn(a, b) { 
                if (a[6] < b[6]){
                    return -1
                }
                else if (a[6] > b[6]){
                    return 1
                }

                /* Ties are broken by the lowest cost. */
                else {
                    if (a[7] < b[7]){
                        return -1
                    }
                    else if (a[7] > b[7]){
                        return 1
                    }
                    else {
                        return 0
                    }
                }
            }); // visible.sort
        } // else if

        /* If the sorting type is by airline, sort alphabetically. */
        else{
            visible.sort(function compareFn(a, b) { 
                if (a[1] < b[1]){
                    return -1
                }
                else if (a[1] > b[1]){
                    return 1
                }

                /* Ties are broken by the lowest cost. */
                else {
                    if (a[7] < b[7]){
                        return -1
                    }
                    else if (a[7] > b[7]){
                        return 1
                    }
                    else {
                        return 0
                    }
                }
            }); // visible.sort
        } // else
    } // update

    /* The React object for displaying the page. */
    function Page(){

        /* If no search has been made, show the home page. */
        if (!searched){
            return (
                <div>
                <div class="header" className="App-header">
                    <h1>dinoSOAR</h1>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <div className="App-body">
                    <h2>Search for Flights!</h2>
                        <label htmlFor="from">From: </label>
                        <div class="dropdown">
                            <button>{departureLocation}</button>
                            <div class="dropdown-content">
                                <FromCountry/>
                            </div>
                        </div>
                        <label htmlFor="from">To: </label>
                        <div class="dropdown">
                            <button>{destination}</button>
                            <div class="dropdown-content">
                                <ToCountry/>
                            </div>
                        </div>
                        <br/>

                        <label htmlFor="departDate">Departure Date:</label>
                        <input
                            type="date"
                            id="departDate"
                            name="departDate"
                            value={departDate}
                            onChange={(event) => setDepartureDate(event.target.value)}
                        />
                        <br/>

                        <input type="submit" id="search" value="Search" onClick = {() =>sendSearchResults()}></input>

                </div>
            </div>
            );
        } // if

        /* If a search has been made, show the results page. */
        else {
            return (
                <div>
                <div class="header" className="App-header">
                    <h1>dinoSOAR</h1>
                </div>
                
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

                <div className="App-body">
                    <div class="container">
                        <button onClick = {() => setSearched(false)}>Return to search</button>
                    </div>
                    <ResultPage/>
                </div>
            </div>
            );
        }
    }

    /* Passively call the update function each time a change on the page is detected. */
    update();

    /* Return the html to be displayed */
    return (
        <div className="App">
            <Page/>
        </div>
        
    );

}

/* Indicate the Home function is the function
to be run when the webpage is opened. */
export default Home;