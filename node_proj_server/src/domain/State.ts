export class State {

    public IdList = []

    public ConnectUser(): number {
        var lastId = this.IdList[this.IdList.length - 1];
        var Id = lastId ?? 0;
        this.IdList.push(++Id);
        return Id;
    }
}