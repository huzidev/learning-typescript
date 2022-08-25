import Page from 'components/Page';

import HomeSlider from './Slider';
import HomeForm from './Form';

function HomePage(): JSX.Element {
  // HomeForm is the logIn form and signUp form on the home page
  return (
    <Page>
      <div id="home-page">
        <HomeSlider />
        <HomeForm />
      </div>
    </Page>
  );
}

export default HomePage;
