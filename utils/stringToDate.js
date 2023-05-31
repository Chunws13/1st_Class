class makeDatetime {
    constructor(string) {
        this.year = string.substr(0, 4);
        this.month = string.substr(4, 2);
        this.day = string.substr(6, 2);
        this.hour = string.substr(8, 2);
        this.minute = string.substr(10, 12);
    };

    mkDatetime() {
        const dateTime = new Date(`${this.year}-${this.month}-${this.day}T${this.hour}:${this.minute}:00`);
        dateTime.setHours(dateTime.getHours() + 9);
        return dateTime;
    };

    mkDate() {
        return new Date(`${this.year}-${this.month}-${this.day}`);
    };
}

module.exports = makeDatetime;