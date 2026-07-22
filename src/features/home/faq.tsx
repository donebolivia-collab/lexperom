const FAQ_ITEMS = [
  {
    question: "¿Tiene algún costo enviar mi consulta?",
    answer:
      "Enviar tu consulta y recibir una primera evaluación no tiene costo. Si el caso requiere representación, te informaremos las condiciones antes de continuar.",
  },
  {
    question: "¿Qué pasa con la información que envío?",
    answer:
      "Se trata como información confidencial y se usa únicamente para evaluar tu consulta y contactarte. Puedes leer el detalle en la Política de Privacidad.",
  },
  {
    question: "¿Enviar la consulta me convierte en cliente?",
    answer:
      "No. El envío de tu consulta no crea automáticamente una relación abogado-cliente ni garantiza la aceptación del caso.",
  },
  {
    question: "¿Cuánto tardan en contactarme?",
    answer:
      "Revisamos las consultas por orden de recepción y urgencia. Te contactaremos por el medio que elegiste en el formulario.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Preguntas frecuentes
        </h2>

        <dl className="mt-8 space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-semibold text-ink">{item.question}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
