import cssobj from './logo.less';
import logo from './logo.jpg';
export default () => {
  return (
    <div className={cssobj.logo_wrap}>
      <img src={logo} className={cssobj.logo_img} alt="logo" />
    </div>
  );
};
