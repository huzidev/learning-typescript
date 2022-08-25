import Page from 'components/Page';

import HomeSlider from './Slider';
import HomeForm from './Form';

function HomePage(): JSX.Element {
  return (
    <Page>
      <div id="home-page">
        <HomeSlider />
        {/* HomeForm is the logIn form and signUp form on the home page */}
        <HomeForm />
      </div>
    </Page>
  );
}

export default HomePage;
