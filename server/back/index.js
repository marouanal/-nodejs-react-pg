const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
const bcrypt = require('bcrypt')
const saltRounds = 10;
// const JWT = require('jsonwebtoken')
// const secretWord = 'Marouan'

const credentials = {
  host: 'localhost',
  user: 'postgres',
  password: 'root',
  database: 'marouan',
  port: 5432,
}

const pool = new Pool(credentials)

app.get('/', (req, res) => {
  res.send('Bonjour backend')
})

app.post('/api/login', (req, res) => {
	const { email, password } = req.body
	const query = {
	  text: 'SELECT * FROM login WHERE email = $1',
	  values: [email]
	}
	pool.query(query, async (err, result) => {
	  if (err) {
		res.status(500).send(err)
	  } else {
		if (result.rows.length > 0) {
		  const user = result.rows[0]
		  if (user.confirm === "0") {
			const hashedPassword = user.password
			const isMatch = await bcrypt.compare(password, hashedPassword)
			if (isMatch) {
			  res.status(200).send({
				"id": user.id,
				"email": user.email
			  })
			} else {
			  res.status(401).send('Invalid credentials')
			}
		  } else {
			res.status(403).send('User not confirmed')
		  }
		} else {
		  res.status(404).send('User not found')
		}
	  }
	})
  })
  

app.post('/api/register', async (req, res) => {
  const { email, username, password, favsport } = req.body
  // Check if any required fields are missing or empty
  if (!email || !username || !password || !favsport) {
    return res.status(400).send('All fields are required.')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const values = [email, username, hashedPassword, favsport]
  const query = {
    text: 'INSERT INTO login (email, username, password, favsport) VALUES ($1, $2 , $3 , $4) RETURNING id;',
    values
  }
  pool.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send({
        "id": result.rows[0].id,
        "email": email,
        "username": username
      })
    }
  })
})


app.use(express.json());



app.patch('/api/forget', async (req, res) => {
  const { email, favsport, password } = req.body;

  // Check if any required fields are missing or empty
  if (!email || !favsport || !password) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const query = {
      text: 'SELECT * FROM login WHERE email = $1 AND favsport = $2',
      values: [email, favsport],
    };
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      const userId = result.rows[0].id;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const updateQuery = {
        text: 'UPDATE login SET password = $1 WHERE id = $2',
        values: [hashedPassword, userId],
      };
      await pool.query(updateQuery);
      res.status(200).send('Password updated successfully');
    } else {
      res.status(400).send('User not found or incorrect favsport');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(4000, () => console.log('running on port 4000'))
