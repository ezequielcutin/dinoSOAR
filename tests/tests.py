import sys
import os

sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../backend"))

from API import RyanAir, Lufthansa


# Tests ryanair duration with airports in different time zones
def test_duration_ryanair():
    origin = "MAD"
    dest = "TFN"
    ryanair = RyanAir()
    flights = ryanair.function(origin, dest, "2023-05-18")

    assert flights[0].duration == 180
    assert flights[1].duration == 175


# Tests lufthansa duration with airports in different time zones
def test_duration_lufhansa():
    origin = "MAD"
    dest = "TFN"
    lufthansa = Lufthansa()
    flights = lufthansa.get_flights(origin, dest, "2023-05-18")

    assert flights[1].duration == 170


def test_lufthansa_flight():
    origin = "PRG"
    dest = "VIE"
    lufthansa = Lufthansa()
    flights = lufthansa.get_flights(origin, dest, "2023-05-18")

    assert len(flights) != 0
    assert flights[0].duration == 50


def test_ryan_noflight():
    origin = "PRG"
    dest = "VIE"
    ryanair = RyanAir()
    flights = ryanair.function(origin, dest, "2023-05-18")

    assert len(flights) == 0


# luft w/ errror
def test_lufthansa_noflight():
    origin = "VIE"
    dest = "PFO"
    lufthansa = Lufthansa()
    flights = lufthansa.get_flights(origin, dest, "2023-05-26")

    for flight in flights:
        print(flight)

    assert len(flights) == 0
