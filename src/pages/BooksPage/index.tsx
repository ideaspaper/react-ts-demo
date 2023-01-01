import React, { useEffect, useState } from 'react';
import Book from '../../components/Book';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { IBook } from '../../interfaces/api';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [booksLoading, setBooksLoading] = useState<boolean>(false);
  const [booksError, setBooksError] = useState<string | null>(null);

  const fetchBooks = () => {
    return new Promise<void>((resolve, reject) => {
      setBooksLoading(true);
      setBooksError(null);
      fetch('http://localhost:8080/books')
        .then((response) => {
          if (!response.ok) throw 'cannot fetch books';
          return response.json();
        })
        .then((data) => {
          setBooks(data);
          resolve();
        })
        .catch((error) => {
          setBooksError(error);
          reject(error);
        })
        .finally(() => {
          setBooksLoading(false);
        });
    });
  };

  const deleteBook = (bookId: number) => {
    return new Promise<void>((resolve, reject) => {
      fetch(`http://localhost:8080/books/${bookId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) throw 'cannot delete book';
          return response.json();
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    fetchBooks().catch((error) => {
      console.log(error);
    });
  }, []);

  const handleOnClickDelete = (bookId: number): void => {
    deleteBook(bookId)
      .then(() => {
        return fetchBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Books</h1>
      {booksLoading && <Loading />}
      {!booksLoading && booksError && <Error />}
      {!booksLoading &&
        !booksError &&
        books.map((book, index) => {
          return (
            <Book
              key={index}
              book={book}
              onClickHandler={handleOnClickDelete}
            />
          );
        })}
    </>
  );
};

export default BooksPage;
