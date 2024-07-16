import json
import requests
from datetime import datetime
from pyairports.airports import Airports
import random


class flight():
    def __init__(self,
                 origin,
                 dest,
                 dept_time,
                 arr_time,
                 duration,
                 price,
                 number):

        self.origin = origin
        self.dest = dest
        self.dept_time = dept_time
        self.arr_time = arr_time
        self.duration = duration
        self.price = price
        self.number = number

    def __str__(self):
        return f"Flight Number: {self.number}\nOrigin: {self.origin}\nDestination: {self.dest}\nDeparture Time: {self.dept_time}\nArrival Time: {self.arr_time}"


class API_call():
    def calculatePrice(duration):
        price = 125/60*duration
        rand = random.uniform(-.1, .1)
        price = price + (rand*price)
        return int(price)


class Lufthansa(API_call):
    token = ''

    def get_token():
        url = 'https://api.lufthansa.com/v1/oauth/token'
        client_id = '3p5mjm58tqzqw5cp9fca5vng5'
        client_secret = '6TfjczK8n2'
        grant_type = 'client_credentials'
        params = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': grant_type
        }

        response = requests.post(url, data=params)

        if response.status_code == 200:
            access_token = response.json()['access_token']
            # print(f'Access token (Lufthansa): {access_token}')
            Lufthansa.token = access_token
        else:
            # Print an error message if the request failed
            print(f'Request failed with status code: {response.status_code}')
            Lufthansa.token = 'retry'
            exit()

    def format_duration(duration):
        hrs = 0
        mins = 0

        if (len(duration) == 5):
            hrs = 0
            mins = int(duration[2:4])
        else:
            hrs = int(duration[2])
            mins = int(duration[4:6])

        hrs = hrs * 60
        duration = hrs + mins

        return duration

    def get_flights(self, origin, destination, date):
        # orgin/destination format: 3 letter IATA airport code
        # date format: yyyy-MM-dd
        Lufthansa.get_token()

        url = "https://api.lufthansa.com/v1/operations/schedules/{origin}/{destination}/{fromDateTime}"
        headers = {
            'Authorization': f'Bearer {Lufthansa.token}'
        }
        params = {
            'directFlights': 'true'
        }

        url = url.format(origin=f"{origin}", destination=f"{destination}", fromDateTime=f"{date}")
        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            print("Error:", response.status_code)
            print("Please try again")
            empty_l = []
            return empty_l

        data = json.loads(response.text)

        flights = []
        # print(json.dumps(data['ScheduleResource']['Schedule'], indent =1))
        for Flight in data['ScheduleResource']['Schedule']:
            # print(json.dumps(Flight, indent=1))
            departure_time = Flight['Flight']['Departure']['ScheduledTimeLocal']['DateTime'][11:]
            arrival_time = Flight['Flight']['Arrival']['ScheduledTimeLocal']['DateTime'][11:]
            duration = Flight['TotalJourney']['Duration']
            duration = Lufthansa.format_duration(duration)
            price = API_call.calculatePrice(int(duration))
            flight_no = Flight['Flight']['MarketingCarrier']['AirlineID'] + Flight['Flight']['MarketingCarrier']['FlightNumber']
            new_flight = flight(origin,
                                destination,
                                departure_time,
                                arrival_time,
                                duration,
                                price,
                                flight_no)
            flights.append(new_flight)

        return flights


class RyanAir(API_call):

    def routes(self, dep_iata, dep_icao, arr_iata, arr_icao,):
        api_base = 'https://airlabs.co/api/v9/routes'
        params = {
            'api_key': 'e94757ac-5390-45eb-9a40-310974d771f3',
            'dep_iata': dep_iata,
            'dep_icao': dep_icao,
            'arr_iata': arr_iata,
            'arr_icao': arr_icao,
            'airline_icao': 'RYR',
            'airline_iata': 'FR',
        }
        response = requests.get(api_base, params=params)
        return response.json()

    def function(self, depIATA, arrIATA, dateDep):
        # need input for origin, destination, departure date
        # input for dates in format: YEAR, MONTH, DAY
        ryanair = RyanAir()
        airports = Airports()
        depICAO = airports.lookup(depIATA).icao
        arrICAO = airports.lookup(arrIATA).icao

        routes_data = ryanair.routes(depIATA, depICAO, arrIATA, arrICAO)
        routes_data = routes_data['response']
        date_obj = datetime.strptime(dateDep, '%Y-%m-%d').date()
        dayDep = date_obj.strftime('%a').lower()

        all_routes = []
        for route in routes_data:
            for day in route['days']:
                if day == dayDep:
                    all_routes.append(route)

        flights = []
        for route in all_routes:
            duration = route['duration']
            price = API_call.calculatePrice(duration)
            f = flight(route['dep_iata'],
                       route['arr_iata'],
                       route['dep_time'],
                       route['arr_time'],
                       duration,
                       price,
                       route['flight_icao'])
            flights.append(f)

        return flights
