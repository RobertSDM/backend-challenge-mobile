import fs from "fs";

const isDatabaseEmpty = () => {
  fs.readdirSync("database", (err, arquivos) => {
    if (err) return null;
    return arquivos.lenght === 0;
  });
};

const loadData = () => {
  if (!isDatabaseEmpty) {
    fs.readFile("database/data.txt", "utf8", (err, data) => {
      if (err) return null;

      return JSON.parse(data);
    });
  } else {
    return {};
  }
};

const saveData = (content) => {
  if (isDatabaseEmpty) {
    fs.writeFile(
      "database/data.txt",
      JSON.stringify(content),
      { flag: "w", encoding: "utf-8" },
      (err) => {
        if (err) return null;
        return true;
      }
    );
  }
};

export { isDatabaseEmpty, loadData, saveData };
