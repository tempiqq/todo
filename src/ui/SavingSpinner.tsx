export const SavingSpinner = () => {
  return (
    // контейнер спінера
    <div className="absolute inset-0 rounded bg-white/50 dark:bg-black/30 backdrop-blur-[1px] flex items-center justify-center ">
      {/* спінер */}
      <div
        aria-label="saving"
        className="h-6 w-6 inline-block border-2 border-todo-borderHover border-t-transparent rounded-full animate-spin"
      />
    </div>
  );
};
