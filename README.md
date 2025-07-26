# Tendr - Event Planning Platform

## API Configuration

### Backend Integration
The application is configured to use only the project's backend server running on `http://localhost:8080`. All API calls are made directly to your backend endpoints.

### Backend Requirements
Your backend should provide these endpoints:

#### Vendor Management
- `GET /vendors` - Fetch vendors with filters
- `GET /vendors/:id` - Fetch vendor details by ID
- `POST /auth/vsignup` - Vendor registration
- `POST /auth/vsignup/otp` - Send OTP for vendor signup
- `POST /auth/vsignup/verify` - Verify OTP

#### Vendor Chat System
- `GET /vendor/chats` - Fetch vendor conversations
- `GET /vendor/chats/:id/messages` - Fetch chat messages
- `POST /vendor/chats/:id/messages` - Send message to customer

#### Vendor Dashboard
- `GET /vendor/bookings` - Fetch vendor bookings
- `GET /vendor/stats` - Fetch vendor statistics

#### User Management
- `POST /auth/signup/otp` - User signup OTP
- `POST /auth/login` - User login
- `POST /auth/signup/verify` - User OTP verification
- `GET /consumers/profile` - Get user profile

### Error Handling
The application gracefully handles backend unavailability:
- Returns empty arrays for chat/booking lists
- Shows zero values for statistics
- Logs errors to console for debugging

## Vendor Chat System Integration

A comprehensive vendor chat system has been integrated with the following features:

### Vendor Dashboard (`/vendor/dashboard`)
- **Overview Statistics**: Total bookings, earnings, ratings, and monthly performance
- **Recent Chats**: Quick access to latest customer conversations
- **Recent Bookings**: View and manage upcoming events
- **Quick Actions**: Direct links to chats, bookings, and profile management

### Vendor Chat List (`/vendor/chats`)
- **Conversation Management**: View all customer conversations
- **Search & Filter**: Find chats by customer name, event type, or message content
- **Status Tracking**: Filter by active, pending, or completed conversations
- **Unread Indicators**: Visual badges for unread messages
- **Event Details**: Quick view of event type, date, and guest count

### Vendor Chat Interface (`/vendor/chat`)
- **Real-time Messaging**: Send and receive messages with customers
- **Event Context**: Display event details in chat header
- **Message History**: View complete conversation history
- **Typing Indicators**: Show when customer is typing
- **Quick Actions**: Mark as resolved, archive, or block customers

### API Integration
- **`getVendorChats()`**: Fetch all vendor conversations
- **`getChatMessages(chatId)`**: Get messages for specific chat
- **`sendMessage(chatId, message)`**: Send new message to customer
- **Mock Data**: Fully functional with realistic mock data

### Navigation Flow
1. **Vendor Dashboard** → Overview and quick actions
2. **Chat List** → Browse all conversations
3. **Individual Chat** → Respond to specific customers
4. **Back Navigation** → Seamless return to previous pages

## Vendor Profile Integration

The vendor profile page has been fully integrated with the following features:

### API Integration
- **`getVendorById(vendorId)`**: Fetches detailed vendor information by ID
- **Dynamic routing**: Supports both `/VendorDetails` (legacy) and `/vendor/:id` (new) routes
- **Error handling**: Graceful fallbacks for missing vendors or API errors

### Navigation
- **From Listings**: Click on any vendor card to view their profile
- **From Group Booking**: "View Profile" button on each vendor card
- **From User Dashboard**: "View Vendor Profile" link in booking history
- **Direct URLs**: Access vendor profiles directly via `/vendor/{vendorId}`

### Features
- **Dynamic data loading**: Fetches real vendor data from API
- **Fallback support**: Uses navigation state data when available
- **Loading states**: Shows loading spinner while fetching data
- **Error handling**: Displays user-friendly error messages
- **Responsive design**: Works on all screen sizes

### Usage Examples

```javascript
// Navigate to vendor profile from listings
navigate(`/vendor/${vendor.id}`, { state: { vendor } });

// Navigate to vendor profile from dashboard
navigate(`/vendor/${booking.id}`, { 
  state: { vendor: { id: booking.id, name: booking.vendorName } } 
});

// Direct URL access
// /vendor/123
```

### Data Structure
The vendor profile displays:
- Vendor name and location
- Rating and review count
- Service type and specialties
- Portfolio images
- Contact information
- Booking card with chat and payment options

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Access vendor profiles via listings or direct URLs

## API Endpoints

- `GET /vendors/:id` - Fetch vendor details by ID
- `GET /vendors` - Fetch vendors with filters
- `POST /auth/vsignup` - Vendor registration
- `GET /vendor/chats` - Fetch vendor conversations
- `GET /vendor/chats/:id/messages` - Fetch chat messages
- `POST /vendor/chats/:id/messages` - Send message to customer

## Contributing

Please ensure all vendor profile integrations follow the established patterns and include proper error handling.
