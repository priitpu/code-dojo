import Field from '../field/Field';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import './layout.scss';

export default function Layout() {
  return (
    <div className="f-layout">
      <Header />
      <Menu />
      <Field />
    </div>
  );
}
