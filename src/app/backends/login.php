<?php
// Autoriser les requêtes depuis n'importe quelle origine (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée"]);
    exit();
}

// Connexion à la base de données avec PDO
$host = "localhost";
$dbname = "projet";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, 
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur de connexion à la base de données : " . $e->getMessage()]);
    exit();
}

// Récupération des données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['prenom'], $data['nom'], $data['email'], $data['password'])) {
    $prenom = htmlspecialchars(trim($data['prenom']));
    $nom = htmlspecialchars(trim($data['nom']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hachage du mot de passe
    $sexe = isset($data['sexe']) ? htmlspecialchars(trim($data['sexe'])) : null;
    $jour = isset($data['jour']) ? (int)$data['jour'] : null;
    $mois = isset($data['mois']) ? (int)$data['mois'] : null;
    $annee = isset($data['annee']) ? (int)$data['annee'] : null;

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Adresse email invalide"]);
        exit();
    }

    try {
        // Vérifier si l'email existe déjà
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode(["success" => false, "message" => "Cet email est déjà utilisé"]);
            exit();
        }

        // Requête préparée pour insérer l'utilisateur
        $sql = "INSERT INTO users (prenom, nom, email, password, sexe, jour, mois, annee) 
                VALUES (:prenom, :nom, :email, :password, :sexe, :jour, :mois, :annee)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':prenom' => $prenom,
            ':nom' => $nom,
            ':email' => $email,
            ':password' => $password,
            ':sexe' => $sexe,
            ':jour' => $jour,
            ':mois' => $mois,
            ':annee' => $annee
        ]);

        echo json_encode(["success" => true, "message" => "Utilisateur inscrit avec succès"]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'inscription : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Données incomplètes"]);
}
?>
