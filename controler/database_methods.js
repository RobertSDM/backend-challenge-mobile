import fs from "fs";

const isDatabaseEmpty = () => {
    const files = fs.readdirSync("database", { encoding: "utf-8" });
    return files.length === 0;
};

const loadData = () => {
    if (!isDatabaseEmpty()) {
        const data = fs.readFileSync("database/data.txt", "utf8");
        return JSON.parse(data);
    } else {
        return {};
    }
};

const saveData = async (content) => {
    await fs.writeFile(
        "database/data.txt",
        JSON.stringify(content),
        { flag: "w", encoding: "utf-8" },
        (err) => {
            if (err) return null;
            return true;
        }
    );
};

export { isDatabaseEmpty, loadData, saveData };
