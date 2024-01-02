export default function TailwindColors() {
  return (
    <>
      <div className="max-w-prose text-lt-text p-4">
        <h1 className="text-5xl font-bold underline text-dt-bg">
          Tailwind colors
        </h1>
        <p className="font-bold">Vad är inställt var?</p>
        <p className="py-4">
          I tailwind.config finns alla de olika färgerna samt font. Så för att
          ändra bakgrundsfärg till det ljusa temat använder man "bg-lt-bg"
          eftersom jag döpt den färgen till "lt-bg". På samma sätt gör man med
          text; "text-lt-text".
        </p>
        <p className="py-4">
          I index.css finns lite globala inställningar som jag ställt in. Man
          använder sig av @apply för att använda tailwind-classer i vanliga
          css-filer. De inställningar jag gjort är att jag har satt en storlek
          på h1 globalt (vi kan även lägga till en speciell font där när vi vill
          det), samt jag har satt den globala texten till "font-pc-text". Den
          texten är Raleway och det namnet "font-pc-text" är skapat i
          tailwind.config
        </p>
      </div>
      <div className="max-w-prose bg-dt-bg text-dt-text">
        <h1>Rubrik</h1>
        <p>
          Lorem ipsum <span className="text-pc-yellow font-bold">dolor</span>{" "}
          sit amet consectetur, adipisicing elit. Maxime, sequi quia tempore
          adipisci quaerat corrupti aperiam minima aliquam excepturi, dolor
          rerum ex laborum corporis assumenda reiciendis rem fugiat, voluptas
          <span className="text-pc-green font-bold"> optio!</span>
        </p>
      </div>
      <div className="max-w-prose bg-lt-bg text-lt-text">
        <h1>Rubrik</h1>
        <p>
          Lorem ipsum <span className="text-pc-yellow font-bold">dolor</span>{" "}
          sit amet consectetur, adipisicing elit. Maxime, sequi quia tempore
          adipisci quaerat corrupti aperiam minima aliquam excepturi, dolor
          rerum ex laborum corporis assumenda reiciendis rem fugiat, voluptas
          <span className="text-pc-green font-bold"> optio!</span>
        </p>
      </div>
      <div className="max-w-prose bg-gt-bg text-gt-text">
        <h1>Rubrik</h1>
        <p>
          Lorem ipsum <span className="text-pc-yellow font-bold">dolor</span>{" "}
          sit amet consectetur, adipisicing elit. Maxime, sequi quia tempore
          adipisci quaerat corrupti aperiam minima aliquam excepturi, dolor
          rerum ex laborum corporis assumenda reiciendis rem fugiat, voluptas
          <span className="text-pc-green font-bold"> optio!</span>
        </p>
      </div>
    </>
  );
}
