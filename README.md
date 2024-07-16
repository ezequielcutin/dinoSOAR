Necessary Libraries to install:

    requests
    flask
    flask_cors
    pyairports

To start/stop running the dinoSOAR application, do the following:

    In the dinosoar directory, run

        python run.py

    This should open the application in your browers

Alternatively:

To start/stop running the dinoSOAR application, do the following:

1.  Open two terminal tabs at the frontend folder.
2.  Start the backend first – run the command:
    flask run
    This will start running the flask page on http://localhost:5000
3.  Open the other terminal tab at the front folder and run the command:
    yard start-front
    This will run the frontend webpage on http://localhost:3000
4.  To close the application, hit ctrl+C on the frontend terminal tab
    and follow with ctrl+C on the backend terminal tab.

All done!

