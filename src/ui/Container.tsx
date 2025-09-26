interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-todo-bg dark:bg-todo-bg-dark rounded-lg border border-todo-border dark:border-dark-border">
      {children}
    </div>
  );
};
