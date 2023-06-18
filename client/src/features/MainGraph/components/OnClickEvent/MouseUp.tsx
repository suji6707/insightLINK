const handleNodeUnclick = (pressTimer: any) => {
  return () => {
    if (pressTimer.current !== null) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };
};

export default handleNodeUnclick;
