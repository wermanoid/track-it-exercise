import Tab, { TabProps } from '@material-ui/core/Tab';

const suppressClick = (event: any) => {
  event.preventDefault();
};

const NavLink: React.SFC<TabProps> = ({ children, ...rest }) => (
  <Tab component="a" label={children} onClick={suppressClick} {...rest} />
);

export default NavLink;
