interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <header className="text-2xl md:text-4xl font-bold font-sempione max-w-lg">
      {title}
    </header>
  );
};

export default Header;
