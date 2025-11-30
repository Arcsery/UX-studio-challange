package app.challenge.contacts.contact

import jakarta.persistence.*

@Entity
@Table(name = "contacts")
data class Contact(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false, unique = true)
    var email: String,

    var phone: String? = null,

    var imageUrl: String? = null
)