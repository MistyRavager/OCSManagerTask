## Calendar backend for OCS Tech Cell Manager Task 2024-25

### Summary
This is a simple calendar backend for the OCS Tech Cell Manager Task 2024-25. It is built using Node.js and Express.js. The backend and DB is hosted on a VM on Azure and postgreSQL is used as the database.

### Link to repository
https://github.com/MistyRavager/OCSManagerTask

### My Workflow
- I started by creating a new Node.js project and installed the required dependencies.
- Created a new database on my Azure VM and connected it to my project (forwarded port 5432 to 8000 on local machine for development).
- Created the required tables and populated them with some dummy data.
- Created the required routes for the calendar backend.
- Setup a subdomain of iith.dev (Lambda's website) on namecheap and pointed it to the VM's public IP.
- Made a NGINX configuration file to forward requests to the backend port from the default port 80, and also added SSL certificates using Certbot.
- Tested the routes using cURL and also tested the subdomain using a browser.
- Started making a docker-compose file to run the backend and DB in a containerized environment but then realized that it was not required for this task lmao.
- Wrote the README.md file, and pushed the code to GitHub.
- Pulled the code on the VM using github access token
- Ran the backend using tmux so that it runs in the background even after I logout. (could have used screen, pm2, or a systemd service)

### Routes
- GET /api/calendar/get_calendar_by_month/:year/:month
    - Returns the calendar for the given year and month.
    - Example: /api/calendar/2024/10
- GET /api/calendar/get_calendar_by_date/:year/:month/:day
    - Returns the events for the given year, month, and day.
    - Example: /api/events/2024/3/11
- GET /api/calendar/get_calendar_today
    - Returns the events for today's date.
    - Example: /api/calendar/get_calendar_today

- POST /api/calendar/add_calendar_event
    - Adds a new event to the database.
    - Example: /api/calendar/add_calendar_event
    - Body: {"title": "Meeting", "description": "Meeting with the OCS team", "start_time": "2024-03-15 10:00:00", "end_time": "2024-03-16 11:00:00", "user_ids": [1, 2, 3]}
    - example of cURL: curl -X POST -H "Content-Type: application/json" -d '{"title": "Meeting", "description": "Meeting with the team", "start_time": "2024-03-11 10:00:00", "end_time": "2024-03-12 11:00:00", "user_ids": [1, 2, 3]}' https://temp.iith.dev/api/calendar/add_calendar_event

