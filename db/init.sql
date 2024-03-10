DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS calendar_events;
DROP TABLE IF EXISTS user_calendar_events;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE calendar_events (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description text,
  start datetime NOT NULL,
  end datetime NOT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user_calendar_events (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  calendar_event_id int(11) NOT NULL,
  primary key (id),
  foreign key (user_id) references users (id),
  foreign key (calendar_event_id) references calendar_events (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users (email) VALUES ('user1@example.com');
INSERT INTO users (email) VALUES ('user2@example.com');
INSERT INTO users (id, email) VALUES (3, 'user3@example.com');
INSERT INTO users (email) VALUES ('user4@example.com');
INSERT INTO users (email) VALUES ('user5@example.com');
INSERT INTO users (id, email) VALUES (6, 'user6@example.com');
INSERT INTO users (email) VALUES ('user7@example.com');
INSERT INTO users (email) VALUES ('user8@example.com');
INSERT INTO users (id, email) VALUES (9, 'user9@example.com');
INSERT INTO users (email) VALUES ('user10@example.com');
INSERT INTO users (email) VALUES ('user11@example.com');
INSERT INTO users (id, email) VALUES (12, 'user12@example.com');
INSERT INTO users (email) VALUES ('user13@example.com');
INSERT INTO users (email) VALUES ('user14@example.com');
INSERT INTO users (id, email) VALUES (15, 'user15@example.com');
INSERT INTO users (email) VALUES ('cs21btech11033@iith.ac.in');

INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 1', 'Description for Event 1', '2024-03-10 08:00:00', '2024-03-10 10:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 2', 'Description for Event 2', '2024-03-11 14:30:00', '2024-03-11 16:30:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Meeting A', 'Team meeting', '2024-03-12 09:00:00', '2024-03-12 10:30:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Conference X', 'Annual conference', '2024-03-13 12:00:00', '2024-03-14 17:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Lunch with Client', 'Discuss project updates', '2024-03-15 12:30:00', '2024-03-15 14:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Workshop Y', 'Training session', '2024-03-16 10:00:00', '2024-03-16 15:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 7', 'Description for Event 7', '2024-03-17 16:00:00', '2024-03-17 18:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Product Launch', 'Unveiling new product', '2024-03-18 19:00:00', '2024-03-18 21:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Team Building', 'Outdoor activities', '2024-03-19 10:00:00', '2024-03-19 15:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 10', 'Description for Event 10', '2024-03-20 14:00:00', '2024-03-20 16:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Client Meeting', 'Discuss project milestones', '2024-03-21 11:00:00', '2024-03-21 13:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Training Session', 'New software rollout', '2024-03-22 15:30:00', '2024-03-22 17:30:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 13', 'Description for Event 13', '2024-03-23 18:00:00', '2024-03-23 20:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Project Deadline', 'Final project submission', '2024-03-24 09:00:00', '2024-03-24 18:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 15', 'Description for Event 15', '2024-03-25 13:00:00', '2024-03-25 15:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Networking Mixer', 'Meet industry professionals', '2024-03-26 19:30:00', '2024-03-26 21:30:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 17', 'Description for Event 17', '2024-03-27 16:00:00', '2024-03-27 18:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Seminar Z', 'Educational seminar', '2024-03-28 10:00:00', '2024-03-28 13:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Project Review', 'Team project review', '2024-03-29 14:00:00', '2024-03-29 16:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 20', 'Description for Event 20', '2024-03-30 17:00:00', '2024-03-30 19:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Training Workshop', 'Employee skill development', '2024-03-31 11:30:00', '2024-03-31 15:30:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 22', 'Description for Event 22', '2024-04-01 14:00:00', '2024-04-01 16:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Board Meeting', 'Corporate strategy discussion', '2024-04-02 09:00:00', '2024-04-02 12:00:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Event 24', 'Description for Event 24', '2024-04-03 17:30:00', '2024-04-03 19:30:00');
INSERT INTO calendar_events (title, description, start, end) VALUES ('Project Kickoff', 'Initiate new project', '2024-04-04 10:00:00', '2024-04-04 12:00:00');

INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 1);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 2);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 3);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 4);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 5);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 6);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 7);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 8);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 9);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 10);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 11);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 12);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 13);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 14);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 15);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 16);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 17);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 18);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 19);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (16, 20);

INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (6, 1);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (7, 2);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (8, 3);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (9, 4);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (5, 5);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (1, 6);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (2, 7);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (3, 8);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (4, 9);
INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES (5, 10);
