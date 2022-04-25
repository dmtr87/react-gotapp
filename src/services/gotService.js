export default class GotService {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api";
    }



    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error (`Ошибка url ${this._apiBase}${url}, status: ${res.status}`)
        }
        
        return await res.json();
    }
    async getAllCharacters() {
        /** В переменную  allCharacters записываем массив обьектов и с помощью .map перебираем его для изменения this.setstate   */
        const allCharacters = await this.getResource('/characters?page=2&pageSize=10');
        return allCharacters.map(this._transformCharacters);
    }   
    async getAllCharacterID(id) {
        /**В переменную  character записываем объект  и  этот объект в качестве аргумента передаём в функцию _tranformCharacters() */
        const character = await this.getResource(`/characters/${id}`) ;
        return this._transformCharacters(character);
    }
    getAllBoooks() {
        return this.getResource('/books?page=2&pageSize=10')
    }   
    getBooksID(id) {
        return this.getResource(`/books/${id}`) 
    }
    getAllHouses() {
        return this.getResource('/houses?page=2&pageSize=10')
    }   
    getHousesID(id) {
        return this.getResource(`/houses/${id}`) 
    }


/** Трансформируем наш обьект для  того что бы в будущем протисать this.setstate  . И непрописывать для каждой функции которая меняет state   */
    _transformCharacters(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouses(houses) {
        return {
            name: houses.name,
            region: houses.region,
            words: houses.words,
            titles: houses.titles,
            ooverlord: houses.overlord,
            ancestralWeapons: houses.ancestralWeapons
        }
    }
    _transformBooks(books) {
        return {
            name: books.name,
            numberOfPages: books.numberOfPages,
            publisher: books.publisher,
            released: books.released,
            ooverlord: books.overlord,
            ancestralWeapons: books.ancestralWeapons
        }
    }


}   