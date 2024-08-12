import { ReactNode } from 'react';
import Providers from '@/utils/Providers';
import '../styles/globals.css';


export const metadata = {
  title: "Electricity Price app",
  description: "Genrated by create next app",
}
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
