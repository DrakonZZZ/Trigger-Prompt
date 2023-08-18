import AppContext from '@/utils/context';
import './globals.css';
import { Nav, Provider } from '@/components';

export const metadata = {
  title: {
    default: 'Trigger',
    template: '%s | Trigger',
  },
  description: 'Share all your amazing prompts/triggers with us',
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AppContext>
          <Provider>
            <div className="prime">
              <div className="gradiant"></div>
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </Provider>
        </AppContext>
      </body>
    </html>
  );
};

export default RootLayout;
