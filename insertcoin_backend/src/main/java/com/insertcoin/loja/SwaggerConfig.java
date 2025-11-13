package com.insertcoin.loja;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("InsertCoin API")
                .version("1.0")
                .description("API para gerenciamento de loja de jogos retrô")
                .contact(new Contact()
                    .name("Seu Nome e da Colega")
                    .url("https://github.com/Dracozauberer/insertcoin-projeto")
                )
            );
    }
}