export class ScopeListGeneration {
  execute(): string {
    const scopeList = [
      "Desk.tickets.ALL",
      "Desk.settings.READ",
      "Desk.basic.READ",
      "Desk.contacts.CREATE",
      "Desk.contacts.READ",
      "Desk.search.READ",
      "Desk.products.CREATE",
    ];
    let scopeString = "";
    for (const scope of scopeList) {
      scopeString += scope;
      if (scope !== scopeList[scopeList.length - 1]) {
        scopeString += ",";
      }
    }
    return scopeString;
  }
}