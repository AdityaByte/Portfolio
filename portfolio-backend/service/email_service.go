package service

import (
	"crypto/tls"
	"fmt"
	"net/smtp"
	"os"
)

var (
	SMTPHost          = os.Getenv("SMTP_HOST")
	SMTPPort          = os.Getenv("SMTP_PORT")
	SenderMail        = os.Getenv("SENDER_MAIL")
	SenderAppPassword = os.Getenv("SENDER_APP_PASSWORD")
	RecipentEmail     = os.Getenv("RECIPENT_MAIL")
)

func CreateSMTPClient() (*smtp.Client, error) {

	connection, err := tls.Dial("tcp", fmt.Sprintf("%s:%s", SMTPHost, SMTPPort), &tls.Config{
		ServerName: SMTPHost,
	})

	if err != nil {
		return nil, fmt.Errorf("Failed to connect: %v", err)
	}

	client, err := smtp.NewClient(connection, SMTPHost)

	if err != nil {
		return nil, fmt.Errorf("Failed to create smtp client %v", err)
	}

	if err := client.Hello("localhost"); err != nil {
		return nil, fmt.Errorf("SMTP Hello failed: %v", err)
	}

	auth := smtp.PlainAuth("", SenderMail, SenderAppPassword, SMTPHost)
	if err := client.Auth(auth); err != nil {
		return nil, fmt.Errorf("Authentication failed %v", err)
	}

	return client, nil
}

func SendMail(client *smtp.Client, subject string, body string) error {
	if err := client.Mail(SenderMail); err != nil {
		return err
	}

	if err := client.Rcpt(RecipentEmail); err != nil {
		return err
	}

	wc, err := client.Data()

	if err != nil {
		return err
	}

	defer wc.Close()

	// message := fmt.Sprintf("Subject %s\r\n\r\n%s", subject, body)

	message := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s", SenderMail, RecipentEmail, subject, body)

	_, err = wc.Write([]byte(message))

	return err
}
