import './globals.css';
import { Nav, Provider } from '@/components';

export const metadata = {
  title: 'Trigger',
  description: 'Share your amazing ai prompts with us.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="prime">
            <div className="gradiant"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
