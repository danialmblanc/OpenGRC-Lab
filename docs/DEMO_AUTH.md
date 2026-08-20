# Demo Authentication

OpenGRC Lab includes a **Demo Authentication** system to allow immediate exploration of the platform without requiring external service configuration.

## How it Works

1. **Landing Page**: The user is presented with "Demo Learner" and "Demo Admin" options.
2. **Mock Login**: Clicking an option calls the `/api/auth/demo` endpoint.
3. **Token Generation**: The server returns a dummy JWT-like token and a mock user object.
4. **Persistence**: The token and user are stored in the `useAuthStore` (Zustand) and persisted in `localStorage`.
5. **Route Protection**: The `Layout` and `AdminLayout` components check the store for a valid user and role before rendering.

## Security Warning
The default demo configuration is **NOT SECURE** for production.
- The JWT secret is a public placeholder.
- No real password verification occurs.
- Tokens do not expire.

## Transitioning to Production Auth

To implement real authentication:

1. **Choose a Provider**: (e.g., Auth0, Firebase, Clerk, or NextAuth).
2. **Update `mockService.ts`**: Replace `loginDemo` with calls to your provider's SDK.
3. **Update `server.ts`**: Implement real JWT verification middleware for `/api` routes.
4. **Secure the Admin Panel**: Ensure the `admin` role is verified server-side using claims from your auth provider.
5. **Disable Demo Mode**: Set `NEXT_PUBLIC_DEMO_MODE="false"` in your `.env`.
