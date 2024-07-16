from API import RyanAir
from API import Lufthansa


def controller(origin, destination, depart_date):

    ryanair = RyanAir()
    LH = Lufthansa()

    RyanAir_data = ryanair.function(origin, destination, depart_date)
    LH_data = LH.get_flights(origin, destination, depart_date)

    departure_flight_data = RyanAir_data + LH_data

    return departure_flight_data
