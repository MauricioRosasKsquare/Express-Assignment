// All middelwares

function duplicated(req, res, next) {
    const { body: {tittle, author, publication_year} } = req; 
    const requireBooks = require("../data/books.json")
    const coincidences = requireBooks.filter(book => (book.tittle == tittle && book.author == author && book.publication_year == publication_year))
    if(coincidences.length === 0){
        next();
    }else{
        res.status(404).send({
            message:  'You can not have duplicacted books'
        });
    }
}

function authorValidator(req, res, next){
    const { body: {author} } = req;
    const trimAuthor = author.trim();
    
    if(!trimAuthor == " "){
        req.body.author = trimAuthor;
        next();
    }else{
        res.status(404).send({
            message:  'The entered author can not be empty'
        });
    }
    
    
}

function yearValidator(req, res, next) {
    const { body: {publication_year} } = req;
    const year = parseInt(publication_year, 10)
    const actualYear = new Date().getFullYear()
    if(!isNaN(year)){
        if(year > 1454 ){
            if(year <= actualYear){
                req.body.publication_year = year;
                next()
            }else{
                res.status(404).send({
                    message: 'The entered year is invalid because it is from the future.'
                });
            }
        }else{
            res.status(404).send({
                message: 'The entered year is invalid because it is before the first registration.'
            });
        }
    }else{
        res.status(404).send({
            message: 'The entered year is invalid'
        });
    }
}

module.exports = {
    duplicated,
    authorValidator,
    yearValidator
};