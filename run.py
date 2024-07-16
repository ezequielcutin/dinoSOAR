import subprocess
import os

current_directory = os.getcwd()
backend_d = 'backend'
backend = os.path.join(current_directory, backend_d)
frontend_d = 'frontend'
frontend = os.path.join(current_directory, frontend_d)

# Run 'flask run' command in the first directory
flask_process = subprocess.Popen('flask run', cwd=f'{backend}', shell=True)

# Run 'yarn start-run' command in the second directory
yarn_process = subprocess.Popen('yarn start-front', cwd=f'{frontend}', shell=True)
