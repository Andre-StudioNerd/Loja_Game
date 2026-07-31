const Footer = () => {
  return (
    <div
      data-testid="footer"
      className="flex justify-center items-center p-4 w-full bg-black px-20 fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="flex flex-col items-center gap-2 text-sm text-center text-white">
        <div className="flex items-center gap-2">
          <span>
            © {new Date().getFullYear()} Todos os direitos reservados.
          </span>
        </div>
        <p className="text-xs text-white max-w-md">
          Projeto desenvolvido para fins de estudo e portfólio. Aplicação
          exclusivamente Front-End, sem funcionalidades de Back-End ou
          processamento de pagamentos.
        </p>
      </div>
    </div>
  );
};

export default Footer;
