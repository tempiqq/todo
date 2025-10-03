interface HeadingProps {
  text: string;
}

export const Heading = ({ text }: HeadingProps) => {
  return (
    <h1 className="text-4xl font-light text-center py-6 text-todo-text dark:text-dark-text">
      {text}
    </h1>
  );
};
