import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AuthorEntityCreation1634863721187 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'author',
				columns: [
					{
            name: 'id',
            type: 'int',
            isPrimary: true
          },
					{
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('author')
	}

}
