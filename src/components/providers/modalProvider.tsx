"use client";

import { useEffect, useState } from "react";

import CardModal from "../modals/cardModal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
}

export default ModalProvider;
