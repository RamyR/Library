import {getAllBooks, createBook} from '../controllers/BookController';

const getAll = async (req: any, res: any) => {
    try {
        
        const { page = 1, count = 10 } = req.query;
        const { books, booksCount } = await getAllBooks(page, count); 
        return res.status(200).json({ data: books, total: booksCount, page });
    } catch (error) {
        return res.status(400).json({ message: `Error: ${error}` });
    }
};

const create = async (req: any, res: any) => {
    try {
        
        const { title, quantity, isbn, shelfLocation, authorId } = req.body;
        const book  = await createBook(title, quantity, isbn, shelfLocation, authorId); 
        return res.status(201).json({ data: book });
    } catch (error) {
        return res.status(400).json({ message: `Error: ${error}` });
    }
};

// const get = async (req, res) => {
//     try {
//         const book = await Book.findOne({ where: { id: req.params.id } });

//         return requestHandler.sendSuccess(
//             res,
//             "book fetched successfully"
//         )({ book });
//     } catch (error) {
//         return requestHandler.sendError(req, res, error);
//     }
// };


//         return requestHandler.sendSuccess(
//             res,
//             "book created successfully"
//         )({ book });
//     } catch (error) {
//         return requestHandler.sendError(req, res, error);
//     }
// };

// const update = async (req, res) => {
//     try {
//         const book = await Book.update(
//             {
//                 title: req.body.title,
//                 author: req.body.author,
//                 isbn: req.body.isbn,
//                 quantity: req.body.quantity,
//                 shelf_location: req.body.shelf_location,
//             },
//             {
//                 where: {
//                     id: req.params.id,
//                 },
//             }
//         );

//         return requestHandler.sendSuccess(res, "book updated successfuly")({});
//     } catch (error) {
//         return requestHandler.sendError(req, res, error);
//     }
// };

// const destroy = async (req, res) => {
//     try {
//         const book = await Book.destroy({ where: { id: req.params.id } });

//         return requestHandler.sendSuccess(res, "book deleted successfuly")({});
//     } catch (error) {
//         return requestHandler.sendError(req, res, error);
//     }
// };

// const search = async (req, res) => {
//     try {
//         const books = await Book.findAndCountAll({
//             where: {
//                 [Op.or]: [
//                     { title: { [Op.like]: req.params.query + "%" } },
//                     { author: { [Op.like]: req.params.query + "%" } },
//                     { isbn: { [Op.like]: req.params.query + "%" } },
//                 ],
//             },
//         });

//         const result = books.rows;
//         return requestHandler.sendSuccess(
//             res,
//             `you have ${books.count} search results`
//         )({ result });
//     } catch (error) {
//         return requestHandler.sendError(req, res, error);
//     }
// };

export {
    getAll,
    // get,
    create,
    // update,
    // destroy,
    // search,
};
