interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <h1 className="text-2xl md:text-4xl font-bold font-sempione max-w-lg">
      {title}
    </h1>
  );
};

export default Header;
