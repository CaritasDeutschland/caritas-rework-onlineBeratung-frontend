import {
	generateMultipleAskerSessions,
	generateMultipleConsultantSessions,
	sessionsReply
} from '../support/sessions';
import sessionListI18n from '../../src/resources/scripts/i18n/de/sessionList';

describe('Sessions', () => {
	describe('Consultant', () => {
		it('should list my sessions', () => {
			const amountOfSessions = 3;
			const sessions = generateMultipleConsultantSessions(
				amountOfSessions
			);
			cy.caritasMockedLogin({
				type: 'consultant',
				sessions
			});

			cy.get('a[href="/sessions/consultant/sessionView"]').click();
			cy.get('.sessionsListItem').should('have.length', amountOfSessions);
		});

		describe('Access Token expires while logged in', () => {
			it('should logout if trying to paginate sessions', () => {
				const amountOfSessions = 100;
				const sessions = generateMultipleConsultantSessions(
					amountOfSessions
				);

				cy.caritasMockedLogin({
					type: 'consultant',
					sessions,
					sessionsCallback: (req) => {
						const url = new URL(req.url);
						if (parseInt(url.searchParams.get('offset')) > 0) {
							req.reply(401);
						} else {
							req.reply(sessionsReply({ sessions }));
						}
					}
				});

				cy.get('a[href="/sessions/consultant/sessionView"]').click();
				cy.get('.sessionsListItem').should('exist');

				cy.get('.sessionsList__scrollContainer').scrollTo('bottom');
				cy.get('#loginRoot').should('exist');
			});
		});
	});

	describe('Asker', () => {
		it('should list my sessions', () => {
			const amountOfSessions = 3;
			const sessions = generateMultipleAskerSessions(amountOfSessions);
			cy.caritasMockedLogin({
				type: 'asker',
				sessions
			});

			cy.get('.sessionsListItem').should('have.length', amountOfSessions);
		});

		it('should show a header with headline', () => {
			cy.caritasMockedLogin({
				type: 'asker'
			});
			cy.get('[data-cy=session-list-header]').should('exist');
			cy.get('[data-cy=session-list-headline]').contains(
				sessionListI18n['view.headline']
			);
		});

		describe('welcome illustration', () => {
			it('should show until given session item limit is reached', () => {
				const sessions = generateMultipleAskerSessions(3);
				cy.caritasMockedLogin({
					type: 'asker',
					sessions
				});
				cy.get('[data-cy=session-list-welcome-illustration]').should(
					'exist'
				);
			});

			it('should not show when given session item limit is reached', () => {
				const sessions = generateMultipleAskerSessions(4);
				cy.caritasMockedLogin({
					type: 'asker',
					sessions
				});
				cy.get('[data-cy=session-list-welcome-illustration]').should(
					'not.exist'
				);
			});
		});
	});
});
