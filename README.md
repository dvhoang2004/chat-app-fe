# Chat Web/App

A modern real estate chat application built with React and Vite.

## Features

- Smart chat sorting (newest messages on top, unread prioritized)
- Unread message indicators and badges
- Real-time messaging with timestamps
- Calendar, Documents, Properties, Offers management
- Settings page
- LocalStorage persistence
- Event scheduling and management
- Invitation system
- Help and Support section
- User profile management
- Document sharing and context management

## Installation

```bash
npm install
```

## Running

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Check code quality
```

## Deployment

This application is deployed using GitHub and Vercel. You can access the live version at: [https://chat-app-fe-pearl-nine.vercel.app/](https://chat-app-fe-pearl-nine.vercel.app/)

## Project Structure

```
src/
├── components/    # ChatList, ChatWindow, SideNavbar, ...
├── pages/         # Chat, CalendarEvent, Documents, Properties, Offers, Settings
├── context/       # Chat, document, event, invitation, user information state management
├── data/          # Contact, Event, Invitation
└── assets/        # Images and static files
```

## Tech Stack

- React 19
- Vite
- React Router DOM v7
- Context API for state management
- LocalStorage for data persistence