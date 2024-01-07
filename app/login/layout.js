export const metadata = {
    title: 'Login - Kinyozi App',
    description: 'Streamline you Barbershop Operations, Optimize Staff, and Enhance Customer Satisfaction',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }