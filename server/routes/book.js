const express = require('express');
const {Book} = require('../models/book');
const router = express.Router();

router.get('/',async (req,res)=>{

    //**/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order

    const books = await Book.find().skip(skip).limit(limit).sort({_id:order})

    if(!books) return res.status(400).json({ error:'no books available'});

    res.send(books);

});
router.get('/:id',async (req,res)=>{
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({
       msg:'The book with the given ID was not found.'
    });
  
    res.send(book);

});
router.post('/',async (req,res) => {

    const book = await new Book(req.body).save();
    
    if(!book) return res.status(400).json({error:true});

    res.json({
        post:true,
        bookId:book._id
    });

});
router.put('/:id',async (req,res)=>{
//     const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findByIdAndUpdate(req.params.id,
     req.body, 
     {new: true });

  if (!book) return res.status(404).send('The genre with the given ID was not found.');
  
  res.json({
      success:true,
      book
    });

});
router.delete('/:id',async (req,res)=>{
    const book = await Book.findByIdAndRemove(req.params.id);

    if (!book) return res.status(404).send('The book with the given ID was not found.');
  
    res.send(book);

});


module.exports = router;